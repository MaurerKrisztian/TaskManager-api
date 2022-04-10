import {IScheduleManager} from "../IScheduleManager";
import {Job, RecurrenceRule, scheduleJob} from "node-schedule";
import {JobManager} from "../JobManager";
import {Injectable, Logger} from "@nestjs/common";
import {TaskService} from "../../../task/task.service";
import {EmailService} from "../../../email/email.service";
import {IUser} from "../../../auth/auth.user.decorator";
import {DailyEmailSender} from "../../../email/senders/daily-email.sender";
import {SchedulesService} from "../../schedules.service";

export interface IScheduleData {
    type: string | 'dailyEmail'| 'WeeklyReport'
}
export interface IDailyEmailData extends IScheduleData {
    date: Date
}

@Injectable()
export class DailyEmailSchedule implements IScheduleManager{
    private readonly logger = new Logger(DailyEmailSchedule.name);

    constructor(private readonly taskService: TaskService,
                private readonly emailService: EmailService,
                private readonly sender: DailyEmailSender,
                private readonly schedulesService: SchedulesService) {
    }

    async addScheduleToManager(userId: string, job: Job, createOptions: any) {
        await this.invalidateSchedule(userId, job);
        const scheduleElement =  await this.schedulesService.addToDb(userId, createOptions)
        JobManager.userSchedules[userId] = {dailyMail: {job: job, dbId: scheduleElement._id}};
        return JobManager.userSchedules[userId].dailyMail.job.name
    }

    async invalidateSchedule(userId: string, job: Job) {
        const res = await this.schedulesService.removeByType(userId, 'dailyEmail');
        console.log(res);

        if (JobManager.userSchedules[userId]?.dailyMail) {
            JobManager.userSchedules[userId].dailyMail.job.cancel()
            this.logger.debug(`remove: ${JobManager.userSchedules[userId].dailyMail.dbId}`)
            return res;
        }
    }

    async createSchedule(user: Omit<IUser, 'password'>, data: IDailyEmailData) {
        const rule = new RecurrenceRule();
        rule.hour = new Date(data.date).getHours() || 8;
        rule.minute = new Date(data.date).getMinutes() || 0;
        this.logger.debug(`create  ${JSON.stringify(rule)}`)
        const job = await scheduleJob(rule, async () => {
            this.logger.debug('Send daily task email');
            const tasks = await this.taskService.getTodayTask(user.id);
            if (!tasks || tasks.length == 0) {
                this.logger.debug('No task today.');
            } else {
                await this.sender.send(user.username, tasks);
            }
        });
        //
        // const scheduleElement =  await this.schedulesService.addToDb(user.id,data)
        return this.addScheduleToManager(user.id, job, data);
    }

}
