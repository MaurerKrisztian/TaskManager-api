import {Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException} from '@nestjs/common';
import { HabitDayStatusService } from './habit-day-status.service';
import {IUser, User} from "../auth/auth.user.decorator";
import {UpdateWeightDto} from "../fitness/weight/dto/update-weight.dto";
import {HabitDayStatusRepository} from "./schemas/habit-day-status.repository";
import {CreateHabitDayStatusDto} from "./dto/create-habit-day-status.dto";

@Controller('habit-day-status')
export class HabitDayStatusController {
    constructor(private readonly habitDayStatusService: HabitDayStatusService, private readonly habitDayStatusRepository: HabitDayStatusRepository) {}

  @Post()
    async create(@Body() createHabitStatusDto: CreateHabitDayStatusDto, @User() user: IUser) {
        createHabitStatusDto.userId = user.id;
        createHabitStatusDto.date = new Date(createHabitStatusDto.date)
        
        // get day date in timezone
        const offset = createHabitStatusDto.date.getTimezoneOffset()
        const offsetMs = offset * 60_000;
        createHabitStatusDto.date = new Date(createHabitStatusDto.date.getTime() - offsetMs);
        const date = new Date(createHabitStatusDto.date)
        date.setHours(0, 0, 0, 0);
        createHabitStatusDto.date = new Date(date);

        const recordOnThatDay = await this.habitDayStatusRepository.find({
            userId: user.id,
            habitId: createHabitStatusDto.habitId,
            $gte: createHabitStatusDto.date,
            $lt: new Date(date.setDate(date.getDate() + 1))
        })
        if (recordOnThatDay.length > 0) {
            throw new BadRequestException({recordOnThatDay: recordOnThatDay}, "Can't create multiple record on the same days.");
        }
        return this.habitDayStatusRepository.create(createHabitStatusDto);
    }

  @Get()
  findAll(@User() user: IUser) {
      return this.habitDayStatusRepository.find({userId: user.id});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
      return this.habitDayStatusRepository.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWeightDto: UpdateWeightDto) {
      return this.habitDayStatusRepository.update(id, updateWeightDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
      return this.habitDayStatusRepository.remove(id);
  }
}
