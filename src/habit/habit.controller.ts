import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HabitService } from './habit.service';
import {CreateWeightDto} from "../fitness/weight/dto/create-weight.dto";
import {IUser, User} from "../auth/auth.user.decorator";
import {UpdateWeightDto} from "../fitness/weight/dto/update-weight.dto";
import {HabitRepository} from "./schemas/habit.repository";
import {HabitDayStatusRepository} from "../habit-day-status/schemas/habit-day-status.repository";

@Controller('habit')
export class HabitController {
    constructor(private readonly habitService: HabitService, private readonly habitRepository: HabitRepository, private readonly habitDayStatusRepository:HabitDayStatusRepository) {}

  @Post()
    create(@Body() createWeightDto: CreateWeightDto,  @User() user: IUser) {
        createWeightDto.userId = user.id;
        return this.habitRepository.create(createWeightDto);
    }

  @Get()
  findAll(@User() user: IUser) {
      return this.habitRepository.find({userId: user.id});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
      return this.habitRepository.findOne(id);
  }

  @Get(':id/statuses')
  getStatuses(@Param('id') id: string) {
      return this.habitDayStatusRepository.find({habitId: id});
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWeightDto: UpdateWeightDto) {
      return this.habitRepository.update(id, updateWeightDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
      return this.habitRepository.remove(id);
  }
}
