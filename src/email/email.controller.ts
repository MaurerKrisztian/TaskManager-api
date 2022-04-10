import {Controller, Get, Post, Body, Logger} from '@nestjs/common';
import {EmailService} from './email.service';
import {IUser, User} from '../auth/auth.user.decorator';
import {TaskService} from '../task/task.service';
import {DailyEmailSchedule} from "../schedules/scheduelers/managers/DailyEmailSchedule";
import {DailyEmailSender} from "./senders/daily-email.sender";

@Controller('email')
export class EmailController {
    private readonly logger = new Logger(EmailController.name);

    constructor(
        private readonly emailService: EmailService,
        private readonly taskService: TaskService,
        private readonly dailyEmailSchedule: DailyEmailSchedule,
        private readonly dailyEmailSender:DailyEmailSender
    ) {
    }


    @Get('todaytasks')
    async getTodayTasks(@User() user: IUser) {
        const tasks = await this.taskService.getTodayTask(user.id);
        return this.dailyEmailSender.send(user.username, tasks);
    }

    @Post('setupeveryday')
    async setup(@User() user: IUser, @Body() body: { date: Date }) {
        return {next: await this.dailyEmailSchedule.createSchedule(user, {...body, type: DailyEmailSchedule.type})}
    }
}
