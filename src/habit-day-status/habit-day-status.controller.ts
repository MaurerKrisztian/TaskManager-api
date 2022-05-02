import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
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
