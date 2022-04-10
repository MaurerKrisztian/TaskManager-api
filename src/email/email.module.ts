import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from '../task/task.module';
import {DailyEmailSender} from "./senders/daily-email.sender";
import {WeeklyReportSender} from "./senders/weekly-report.sender";
import {Senders} from "./senders/senders";
import {SchedulesModule} from "../schedules/schedules.module";

@Module({
    imports: [ConfigModule, TaskModule, SchedulesModule],
    controllers: [EmailController],
    providers: [EmailService, DailyEmailSender, WeeklyReportSender, Senders],
    exports: [EmailService, DailyEmailSender, WeeklyReportSender],
})
export class EmailModule {}
