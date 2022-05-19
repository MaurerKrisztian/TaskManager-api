import {Injectable} from "@nestjs/common";
import {TemplateClient} from "@maurerkrisztian/tempalte-client/dist";
import {INewRoomResponse} from "@maurerkrisztian/dailyco-api-client";
import {CreateMeetingDto} from "../../videocall/dto/create-videocall.dto";

@Injectable()
export class MeetingEmailSender {

    constructor(private readonly templateClient: TemplateClient) {
    }

    async send(createMeetingDto: CreateMeetingDto, room: INewRoomResponse) {
        const result = []
        for (const member of createMeetingDto.members) {
            const res =  await this.templateClient.sendMailWithTemplate({
                mailOptions: {
                    from: '"Mail service" <foo@example.com>',
                    to: member.email,
                    subject: 'Meeting room',
                },
                template: {
                    name: "meeting_template",
                    data: {
                        roomName: room.name,
                        memberName: member.name,
                        startAt:
                            createMeetingDto?.room?.properties?.nbf || new Date().getTime(),
                        meetingLength: 33,
                        meetingLink: room.url,
                        memberList: createMeetingDto.members
                            .map((member) => member.name)
                            .join(', '),
                    },
                }
            })
            result.push(res);
        }
        return result
    }
}
