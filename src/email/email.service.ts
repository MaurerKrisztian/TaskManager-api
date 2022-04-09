import { Injectable } from '@nestjs/common';
import { Transporter } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import {ITask, TaskDocument} from '../task/schemas/task.schema';
import * as fs from 'fs';
import {EmailBaseService} from "./email-base.service";
import {TemplatePaths} from "./templates/TemplatePaths";

const hbs = require('nodemailer-express-handlebars');
const path = require('path');

@Injectable()
export class EmailService extends EmailBaseService {

    transporter: Transporter;

    constructor() {
        super()
    }

    sendTodayTasks(email: string, tasks: ITask[]) {
        const mailOptions: Mail.Options | any = {
            from: '"Task Manager 👻" <foo@example.com>', // sender address
            to: email.toLocaleLowerCase(), // list of receivers
            subject: 'Today tasks ✔', // Subject line
            text: 'test', // plain text body
            template: 'email', // the name of the template file i.e email.handlebars
            context: {
                style: fs.readFileSync('./src/email/templates/email.css').toString(),
                data: tasks.map((task) => {
                    return {
                        title: task.title,
                        startAt: `${task.startAt.getHours()}:${task.startAt.getMinutes()}`,
                    };
                }),
            },
        };
        return this.sendMail(mailOptions, TemplatePaths.getDailyEmilHbs());
    }

    async sendWeeklyReport(username: string, tasks: TaskDocument[]) {
        
    }
}
