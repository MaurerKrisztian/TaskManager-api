import { Module } from '@nestjs/common';
import { HabitDayStatusService } from './habit-day-status.service';
import { HabitDayStatusController } from './habit-day-status.controller';
import {HabitDayStatusRepository} from "./schemas/habit-day-status.repository";
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import {HabitDayStatus, HabitDayStatusSchema} from "./schemas/habit-day-status.schema";

@Module({
    imports: [ConfigModule,
        MongooseModule.forFeature([
            {
                name: HabitDayStatus.name,
                schema: HabitDayStatusSchema,
            },
        ]),],
    controllers: [HabitDayStatusController],
    providers: [HabitDayStatusService, HabitDayStatusRepository],
    exports: [HabitDayStatusRepository]
})
export class HabitDayStatusModule {}
