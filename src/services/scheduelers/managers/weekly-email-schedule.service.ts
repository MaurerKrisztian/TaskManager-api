import {IScheduleManager} from "../IScheduleManager";
import {Job, RecurrenceRule, scheduleJob} from "node-schedule";
import {JobManager} from "../JobManager";
import {Injectable, Logger} from "@nestjs/common";
import {IUser} from "../../../auth/auth.user.decorator";
import {TaskService} from "../../../task/task.service";
import {EmailService} from "../../../email/email.service";

export interface IWeeklyEmailData {
    dayOfWeek: number,
    dateForTime: Date,
    reportDayLength: number
}

@Injectable()
export class WeeklyEmailSchedule implements IScheduleManager{
    private readonly logger = new Logger(WeeklyEmailSchedule.name)

    constructor(private readonly taskService: TaskService, private readonly emailService: EmailService) {
    }

    addScheduleToManager(userId: string, job: Job) {
        this.invalidateSchedule(userId, job);
        JobManager.userSchedules[userId].weeklyReport = job;
    }

    invalidateSchedule(userId: string, job: Job) {
        return JobManager.userSchedules[userId]?.weeklyReport
            ? JobManager.userSchedules[userId].weeklyReport.cancel()
            : undefined;
    }

    createSchedule(user: IUser, data: IWeeklyEmailData) {
        const rule = new RecurrenceRule();
        rule.dayOfWeek = data.dayOfWeek
        rule.hour = new Date(data.dateForTime).getHours() || 8;
        rule.minute = new Date(data.dateForTime).getMinutes() || 0;

        const job = scheduleJob(rule, async () => {
            this.logger.debug('Send weekly report email');
            const startDate = new Date();
            startDate.setDate(startDate.getDate()-data.reportDayLength);
            const tasks = await this.taskService.getTasksAfter(startDate);

            if (!tasks || tasks.length == 0) {
                this.logger.debug('No task today.');
            } else {
                await this.emailService.sendWeeklyReport(user.username, tasks);
            }
        });
        this.addScheduleToManager(user.id, job);
    }


}
