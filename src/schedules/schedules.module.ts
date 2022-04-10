import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import {JobManager} from "./scheduelers/JobManager";
import {SchedulesRepository} from "./schema/schedules.repository";
import {DailyEmailSchedule} from "./scheduelers/managers/DailyEmailSchedule";
import {WeeklyEmailSchedule} from "./scheduelers/managers/weekly-email-schedule.service";
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import {Schedules, SchedulesSchema} from "./schema/schedules.schema";
import {TaskModule} from "../task/task.module";
import {EmailService} from "../email/email.service";
import {DailyEmailSender} from "../email/senders/daily-email.sender";
import {WeeklyReportSender} from "../email/senders/weekly-report.sender";

@Module({
    imports: [ ConfigModule, MongooseModule.forFeature([{ name: Schedules.name, schema: SchedulesSchema }]), TaskModule],
    controllers: [SchedulesController],
    providers: [SchedulesService, JobManager, SchedulesRepository, DailyEmailSchedule, WeeklyEmailSchedule, EmailService, DailyEmailSender, WeeklyReportSender],
    exports: [DailyEmailSchedule, WeeklyEmailSchedule, SchedulesService, SchedulesRepository]
})
export class SchedulesModule {}
