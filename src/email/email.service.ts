import * as nodemailer from "nodemailer";
import {Injectable, Logger} from "@nestjs/common";
import {Transporter} from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import {ITask} from "../task/schemas/task.schema";
import * as fs from "fs";
import {TemplatePaths} from "./templates/TemplatePaths";

const hbs = require('nodemailer-express-handlebars')
const path = require('path')

@Injectable()
export class EmailService {
    private readonly logger = new Logger(EmailService.name)

    transporter: Transporter

    constructor() {
        this.transporter = this.getTransporter()
    }

    sendTodayTasks(email: string, tasks: ITask[]) {
        const mailOptions: Mail.Options | any = {
            from: '"Task Manager 👻" <foo@example.com>', // sender address
            to: email.toLocaleLowerCase(), // list of receivers
            subject: "Today tasks ✔", // Subject line
            text: "test", // plain text body
            template: 'email', // the name of the template file i.e email.handlebars
            context: {
                style: fs.readFileSync("./src/email/templates/email.css").toString(),
                data: tasks.map(task => {
                    return {
                        title: task.title,
                        startAt: `${task.startAt.getHours()}:${task.startAt.getMinutes()}`
                    }
                })
            }
        }
        return this.sendMail(mailOptions)
    }

    async sendMail(mailOptions?: Mail.Options) {
        const handlebarOptions = {
            viewEngine: {
                partialsDir: path.resolve(`${TemplatePaths.EMAIL_TEMPLATES_PATH}/`),
                defaultLayout: false,
            },
            viewPath: path.resolve(`${TemplatePaths.EMAIL_TEMPLATES_PATH}/`),
        };
        // use a template file with nodemailer
        this.transporter.use('compile', hbs(handlebarOptions))
        const info = await this.transporter.sendMail(mailOptions);
        this.logger.debug(`Send mail: ${JSON.stringify(info)}`)
        return info
    }

    getTransporter() {
        return nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 587,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

    }
}
