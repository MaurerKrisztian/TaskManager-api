import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {EmailService} from './email.service';
import {IUser, User} from "../auth/auth.user.decorator";
import {TaskService} from "../task/task.service";

import * as schedule from 'node-schedule'
import {JobManager} from "./JobManager";


@Controller('email')
export class EmailController {
    constructor(private readonly emailService: EmailService,
                private readonly taskService: TaskService) {
    }

    @Get()
    findAll() {
        return this.emailService.sendMail();
    }

    @Get("todaytasks")
    async getTodayTasks(@User() user: IUser) {
        const tasks = await this.taskService.getTodayTask(user.id);
        return this.emailService.sendTodayTasks(user.username, tasks)
    }

    @Post("setupeveryday")
    async setup(@User() user: IUser, @Body() body: { date: Date }) {
        const rule = new schedule.RecurrenceRule();
        rule.hour =  new Date(body.date).getHours() || 8;
        rule.minute =  new Date(body.date).getMinutes() || 0;

        const job = schedule.scheduleJob(rule, async () => {
            console.log("send job")
            const tasks = await this.taskService.getTodayTask(user.id);
            console.log(tasks)
            if (!tasks || tasks.length == 0) {
                console.log("no task today")
            } else {
                await this.emailService.sendTodayTasks(user.username, tasks)
            }

        })

        JobManager.add(user.id, job)
    }


}
