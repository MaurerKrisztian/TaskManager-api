import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from '../task/task.module';
import {DailyEmailSender} from "./senders/daily-email.sender";
import {WeeklyReportSender} from "./senders/weekly-report.sender";
import {Senders} from "./senders/senders";
import {SchedulesModule} from "../schedules/schedules.module";
import {TemplateModule} from "@maurerkrisztian/tempalte-client/dist";
import {MeetingEmailSender} from "./senders/meeting-email.sender";

@Module({
    imports: [ConfigModule.forRoot({
        envFilePath: '.env'
    }), TemplateModule.forRoot({baseUrl: process.env.TEMPLATE_URL || "http://localhost:3012"}), TaskModule, SchedulesModule],
    controllers: [EmailController],
    providers: [EmailService, DailyEmailSender, WeeklyReportSender, Senders, MeetingEmailSender],
    exports: [EmailService, DailyEmailSender, WeeklyReportSender, MeetingEmailSender],
})
export class EmailModule {}
