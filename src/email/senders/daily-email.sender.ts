import {ITask} from "../../task/schemas/task.schema";
import Mail from "nodemailer/lib/mailer";
import * as fs from "fs";
import {TemplatePaths} from "../templates/TemplatePaths";
import {EmailService} from "../email.service";
import {ISender} from "./ISender";
import {Injectable} from "@nestjs/common";

@Injectable()
export class DailyEmailSender implements ISender {

    constructor(private readonly mailerService: EmailService) {
    }

    send(email: string, tasks: ITask[]) {
        const mailOptions: Mail.Options | any = {
            from: '"Task Manager 👻" <foo@example.com>', // sender address
            to: email.toLocaleLowerCase(), // list of receivers
            subject: 'Today tasks ✔', // Subject line
            text: 'test', // plain text body
            template: 'email', // the name of the template file i.e email.handlebars
            context: {
                style: fs.readFileSync(TemplatePaths.getCssPath("daily_email")).toString(),
                data: tasks.map((task) => {
                    return {
                        title: task.title,
                        startAt: `${task.startAt.getHours()}:${task.startAt.getMinutes()}`,
                    };
                }),
            },
        };
        return this.mailerService.sendMail(mailOptions, TemplatePaths.getEmilHbs('daily_email'));
    }
}
