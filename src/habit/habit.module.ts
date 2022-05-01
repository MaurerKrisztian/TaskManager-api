import { Module } from '@nestjs/common';
import { HabitService } from './habit.service';
import { HabitController } from './habit.controller';
import {HabitRepository} from "./schemas/habit.repository";
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import {Habit, HabitSchema} from "./schemas/habit.schema";
import {HabitDayStatusModule} from "../habit-day-status/habit-day-status.module";

@Module({
    imports: [ConfigModule,
        MongooseModule.forFeature([
            {
                name: Habit.name,
                schema: HabitSchema,
            },
        ]),
        HabitDayStatusModule
    ],
    controllers: [HabitController],
    providers: [HabitService, HabitRepository]
})
export class HabitModule {}
