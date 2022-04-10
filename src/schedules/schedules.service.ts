import { Injectable } from '@nestjs/common';
import {SchedulesRepository} from "./schema/schedules.repository";
import {IScheduleData} from "./scheduelers/managers/DailyEmailSchedule";

@Injectable()
export class SchedulesService {
    constructor(private readonly schedulesRepository: SchedulesRepository) {
    }

    addToDb(userId: string, data: IScheduleData) {
        return this.schedulesRepository.create({userId: userId, createOptions: data})
    }

    removeFromDb(scheduleId: string){
        return this.schedulesRepository.remove(scheduleId)
    }

    removeByType(userId: string, type: string){
        return this.schedulesRepository.deleteMany({userId: userId, 'createOptions.type': type})
    }
}
