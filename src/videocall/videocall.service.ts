import { Injectable } from '@nestjs/common';
import {CreateMeetingDto} from './dto/create-videocall.dto';
import { UpdateVideocallDto } from './dto/update-videocall.dto';
import {DailycoApiClient} from "@maurerkrisztian/dailyco-api-client";
import {MeetingEmailSender} from "../email/senders/meeting-email.sender";

@Injectable()
export class VideocallService {
    constructor(    private readonly videoCallClient: DailycoApiClient, private readonly meetingEmailSender:MeetingEmailSender) {
    }
    async create(createMeetingDto: CreateMeetingDto) {
        const room = await this.videoCallClient.createRoom(createMeetingDto.room);
        await this.meetingEmailSender.send(
            createMeetingDto,
            room,
        );
        return room;
    }

    findAll() {
        return `This action returns all videocall`;
    }

    findOne(id: number) {
        return `This action returns a #${id} videocall`;
    }

    update(id: number, updateVideocallDto: UpdateVideocallDto) {
        return `This action updates a #${id} videocall`;
    }

    remove(id: number) {
        return `This action removes a #${id} videocall`;
    }
}
