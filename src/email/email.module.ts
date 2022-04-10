import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from '../task/task.module';
import {WeeklyEmailSchedule} from "../services/scheduelers/managers/weekly-email-schedule.service";
import {DailyEmailSchedule} from "../services/scheduelers/managers/DailyEmailSchedule";
import {DailyEmailSender} from "./senders/daily-email.sender";
import {WeeklyReportSender} from "./senders/weekly-report.sender";
import {Senders} from "./senders/senders";

@Module({
    imports: [ConfigModule, TaskModule],
    controllers: [EmailController],
    providers: [EmailService, WeeklyEmailSchedule, DailyEmailSchedule, DailyEmailSender, WeeklyReportSender, Senders],
    exports: [EmailService],
})
export class EmailModule {}
