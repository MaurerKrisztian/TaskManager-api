import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    HttpException,
    HttpStatus, Query,
} from '@nestjs/common';
import { WorkedtimeService } from './workedtime.service';
import {groupedByType, WorkedtimeRepository} from './schemas/workedtime.repository';
import { TaskRepository } from '../task/schemas/task.repository';
import {ApiTags} from "@nestjs/swagger";
import {IUser, User} from "../auth/auth.user.decorator";

@Controller('workedtime')
@ApiTags('workedtime')
export class WorkedtimeController {
    constructor(
    private readonly workedtimeService: WorkedtimeService,
    private readonly workedtimeRepository: WorkedtimeRepository,
    private readonly taskRepo: TaskRepository,
    ) {}

  @Post('/start')
    async create(@User() user: IUser, @Body() createWorkedtimeDto: { start: Date; taskId: string }) {
        if (
            await this.workedtimeRepository.hasWorkSessionStarted(
                createWorkedtimeDto.taskId,
            )
        ) {
            throw new HttpException('You have active session.', HttpStatus.FORBIDDEN);
        }
        const doc = await this.workedtimeRepository.create({...createWorkedtimeDto, userId: user.id});
        await this.taskRepo.findOneAndUpdate(
            createWorkedtimeDto.taskId,
            { $push: { workedTimes: doc._id } },
        ); // todo bele egybol
        return this.workedtimeRepository.create({...createWorkedtimeDto, userId: user.id});
    }

  @Post('/end/:id')
  async end(@Param('id') id: string, @Body() body: { end: Date }) {
      const activeWorkSession =
      await this.workedtimeRepository.hasWorkSessionStarted(id);
      if (!activeWorkSession) {
          throw new HttpException(
              'Do not have a work session.',
              HttpStatus.FORBIDDEN,
          );
      }
      const currentWorkSession = (
          await this.workedtimeRepository.getCurrentWorkSession(id)
      )[0];
      return this.workedtimeRepository.update(currentWorkSession._id, {
          end: body.end,
      });
  }

  @Get('/task/:id')
  getWorkedtimeByTask(@Param('id') id: string) {
      return this.workedtimeRepository.find({
          taskId: id,
          start: { $exists: true },
          end: { $exists: true },
      });
  }

    @Get('/chart/workeddays')
  getAllByUser(@User() user: IUser, @Query('groupedBy') groupedBy: groupedByType){
      return this.workedtimeRepository.groupByDay(user.id, groupedBy);
  }

  @Get('/activeWorkSession/:id')
    getActiveWorkSession(@Param('id') id: string) {
        return this.workedtimeRepository.find({
            taskId: id,
            start: { $exists: true },
            end: { $exists: false },
        });
    }
}
