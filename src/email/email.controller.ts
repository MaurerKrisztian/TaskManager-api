import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { IUser, User } from '../auth/auth.user.decorator';
import { TaskService } from '../task/task.service';
import { JobManager } from './JobManager';
import { RecurrenceRule, scheduleJob } from 'node-schedule';

@Controller('email')
export class EmailController {
  private readonly logger = new Logger(EmailController.name);

  constructor(
    private readonly emailService: EmailService,
    private readonly taskService: TaskService,
  ) {}

  @Get()
  findAll() {
    return this.emailService.sendMail();
  }

  @Get('todaytasks')
  async getTodayTasks(@User() user: IUser) {
    const tasks = await this.taskService.getTodayTask(user.id);
    return this.emailService.sendTodayTasks(user.username, tasks);
  }

  @Post('setupeveryday')
  async setup(@User() user: IUser, @Body() body: { date: Date }) {
    const rule = new RecurrenceRule();
    rule.hour = new Date(body.date).getHours() || 8;
    rule.minute = new Date(body.date).getMinutes() || 0;

    const job = scheduleJob(rule, async () => {
      this.logger.debug('send daily task email');
      const tasks = await this.taskService.getTodayTask(user.id);
      if (!tasks || tasks.length == 0) {
        this.logger.debug('no task today');
      } else {
        await this.emailService.sendTodayTasks(user.username, tasks);
      }
    });
    JobManager.add(user.id, job);
  }
}
