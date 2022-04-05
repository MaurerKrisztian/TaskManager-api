import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { WorkedtimeService } from './workedtime.service';
import { WorkedtimeRepository } from './schemas/workedtime.repository';
import { UserRepository } from '../user/schemas/user.repository';
import { TaskRepository } from '../task/schemas/task.repository';

@Controller('workedtime')
export class WorkedtimeController {
  constructor(
    private readonly workedtimeService: WorkedtimeService,
    private readonly workedtimeRepository: WorkedtimeRepository,
    private readonly taskRepo: TaskRepository,
  ) {}

  @Post('/start')
  async create(@Body() createWorkedtimeDto: { start: Date; taskId: string }) {
    console.log(
      'ooooooooooooooooooooooo-------------------------------opoooooooooooooooooooooooooooooooo',
    );
    if (
      await this.workedtimeRepository.hasWorkSessionStarted(
        createWorkedtimeDto.taskId,
      )
    ) {
      throw new HttpException('You have active session.', HttpStatus.FORBIDDEN);
    }
    const doc = await this.workedtimeRepository.create(createWorkedtimeDto);
    const update = await this.taskRepo.findOneAndUpdate(
      createWorkedtimeDto.taskId,
      { $push: { workedTimes: doc._id } },
    ); // todo bele egybol
    // console.log("uuuuuuuuuuuuuuuuuuuuuu",update)
    return this.workedtimeRepository.create(createWorkedtimeDto);
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

    console.log('end', currentWorkSession, { end: body.end });
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

  @Get('/activeWorkSession/:id')
  getActiveWorkSession(@Param('id') id: string) {
    return this.workedtimeRepository.find({
      taskId: id,
      start: { $exists: true },
      end: { $exists: false },
    });
  }
}
