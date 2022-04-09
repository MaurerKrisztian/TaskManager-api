import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from '../task/task.module';
import {WeeklyEmailSchedule} from "../services/scheduelers/managers/weekly-email-schedule.service";
import {DailyEmailSchedule} from "../services/scheduelers/managers/DailyEmailSchedule";

@Module({
    imports: [ConfigModule, TaskModule],
    controllers: [EmailController],
    providers: [EmailService, WeeklyEmailSchedule, DailyEmailSchedule],
    exports: [EmailService],
})
export class EmailModule {}
