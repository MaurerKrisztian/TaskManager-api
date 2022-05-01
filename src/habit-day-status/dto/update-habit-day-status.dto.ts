import { PartialType } from '@nestjs/swagger';
import { CreateHabitDayStatusDto } from './create-habit-day-status.dto';

export class UpdateHabitDayStatusDto extends PartialType(CreateHabitDayStatusDto) {}
