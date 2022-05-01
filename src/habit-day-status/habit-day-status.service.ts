import { Injectable } from '@nestjs/common';
import { CreateHabitDayStatusDto } from './dto/create-habit-day-status.dto';
import { UpdateHabitDayStatusDto } from './dto/update-habit-day-status.dto';

@Injectable()
export class HabitDayStatusService {
  create(createHabitDayStatusDto: CreateHabitDayStatusDto) {
    return 'This action adds a new habitDayStatus';
  }

  findAll() {
    return `This action returns all habitDayStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} habitDayStatus`;
  }

  update(id: number, updateHabitDayStatusDto: UpdateHabitDayStatusDto) {
    return `This action updates a #${id} habitDayStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} habitDayStatus`;
  }
}
