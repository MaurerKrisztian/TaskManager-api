import {IScheduleManager} from "../IScheduleManager";
import {Job, RecurrenceRule, scheduleJob} from "node-schedule";
import {JobManager} from "../JobManager";
import {Injectable, Logger} from "@nestjs/common";
import {IUser} from "../../../auth/auth.user.decorator";
import {TaskService} from "../../../task/task.service";
import {EmailService} from "../../../email/email.service";
import {WeeklyReportSender} from "../../../email/senders/weekly-report.sender";
import {SchedulesService} from "../../schedules.service";
import {IScheduleData} from "./DailyEmailSchedule";

export interface IWeeklyEmailData extends IScheduleData{
    dayOfWeek: number,
    dateForTime: Date,
    reportDayLength: number
}

@Injectable()
export class WeeklyEmailSchedule implements IScheduleManager{
    private readonly logger = new Logger(WeeklyEmailSchedule.name)

    constructor(private readonly taskService: TaskService,
                private readonly emailService: EmailService,
                private readonly sender: WeeklyReportSender,
                private readonly schedulesService: SchedulesService) {
    }

    async addScheduleToManager(userId: string, job: Job, creteOptions: any) {
        await this.invalidateSchedule(userId, job);
        const sch = await this.schedulesService.addToDb(userId, creteOptions)
        JobManager.userSchedules[userId].weeklyReport = {job: job, dbId: sch._id};
    }

    invalidateSchedule(userId: string, job: Job) {
        if (JobManager.userSchedules[userId]?.weeklyReport) {
            JobManager.userSchedules[userId].weeklyReport.job.cancel()
            const res =  this.schedulesService.removeByType(userId, 'WeeklyReport');
            this.logger.debug(JSON.stringify(res))
            return res
        }
    }

    async createSchedule(user: Omit<IUser, 'password'>, data: IWeeklyEmailData) {
        const rule = new RecurrenceRule();
        rule.dayOfWeek = data.dayOfWeek
        rule.hour = new Date(data.dateForTime).getHours() || 8;
        rule.minute = new Date(data.dateForTime).getMinutes() || 0;

        const job = scheduleJob(rule, async () => {
            this.logger.debug('Send weekly report email');
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - data.reportDayLength);
            const tasks = await this.taskService.getTasksAfter(startDate);

            if (!tasks || tasks.length == 0) {
                this.logger.debug('No task today.');
            } else {
                await this.sender.send(user.username, tasks);
            }
        });

        return this.addScheduleToManager(user.id, job, data);
    }


}
