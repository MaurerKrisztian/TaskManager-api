import {ITask} from "../../task/schemas/task.schema";
import {ISender} from "./ISender";
import {Injectable} from "@nestjs/common";
import {TemplateClient} from "@maurerkrisztian/tempalte-client/dist";

@Injectable()
export class DailyEmailSender implements ISender {

    constructor(private readonly templateClient: TemplateClient) {
    }

    send(email: string, tasks: ITask[]) {
        console.log(this.templateClient)
        return  this.templateClient.sendMailWithTemplate({
            mailOptions: {
                from: '"Task Manager 👻" <foo@example.com>',
                to: email.toLocaleLowerCase(),
                subject: 'Today tasks ✔',
                text: 'test',
            },
            template: {
                name: "daily_email",
                data:tasks.map((task) => {
                    return {
                        title: task.title,
                        startAt: `${task.startAt.getHours()}:${task.startAt.getMinutes()}`,
                    };
                }),
            }
        })
    }
}
