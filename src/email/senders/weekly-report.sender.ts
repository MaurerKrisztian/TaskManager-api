import {ISender} from "./ISender";
import {ITask} from "../../task/schemas/task.schema";
import {Injectable} from "@nestjs/common";
import {TemplateClient} from "@maurerkrisztian/tempalte-client/dist";

@Injectable()
export class WeeklyReportSender implements ISender{
    constructor(private readonly templateClient: TemplateClient) {
    }

    send(email: string, tasks: ITask[]) {
        return  this.templateClient.sendMailWithTemplate({
            mailOptions: {
                from: '"Task Manager 👻" <foo@example.com>',
                to: email.toLocaleLowerCase(),
                subject: 'Weekly report ✔',
                text: 'test',
            },
            template: {
                name: "weekly_email",
                data: tasks.map((task) => {
                    return {
                        title: task.title,
                        startAt: `${task.startAt.getHours()}:${task.startAt.getMinutes()}`,
                    };
                })
            }
        })
    }
}
