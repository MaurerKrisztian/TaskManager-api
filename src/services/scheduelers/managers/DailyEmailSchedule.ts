import {IScheduleManager} from "../IScheduleManager";
import {Job, RecurrenceRule, scheduleJob} from "node-schedule";
import {JobManager} from "../JobManager";
import {Injectable, Logger} from "@nestjs/common";
import {TaskService} from "../../../task/task.service";
import {EmailService} from "../../../email/email.service";
import {IUser} from "../../../auth/auth.user.decorator";

@Injectable()
export class DailyEmailSchedule implements IScheduleManager{
    private readonly logger = new Logger(DailyEmailSchedule.name);

    constructor(private readonly taskService: TaskService, private readonly emailService: EmailService) {
    }

    addScheduleToManager(userId: string, job: Job) {
        this.invalidateSchedule(userId, job);
        JobManager.userSchedules[userId] = { dailyMail: job };
        return JobManager.userSchedules[userId].dailyMail.name
    }

    invalidateSchedule(userId: string, job: Job) {
        if (JobManager.userSchedules[userId] == undefined) return;

        return JobManager.userSchedules[userId]?.dailyMail
            ? JobManager.userSchedules[userId].dailyMail.cancel()
            : undefined;
    }

    async createSchedule(user: IUser, date: Date) {
        const rule = new RecurrenceRule();
        rule.hour = new Date(date).getHours() || 8;
        rule.minute = new Date(date).getMinutes() || 0;
        const job = await scheduleJob(rule, async () => {
            this.logger.debug('Send daily task email');
            const tasks = await this.taskService.getTodayTask(user.id);
            if (!tasks || tasks.length == 0) {
                this.logger.debug('No task today.');
            } else {
                await this.emailService.sendTodayTasks(user.username, tasks);
            }
        });
        return this.addScheduleToManager(user.id, job);
    }

}
