import {SchedulesRepository} from "../schema/schedules.repository";
import {DailyEmailSchedule} from "./managers/DailyEmailSchedule";
import {UserRepository} from "../../user/schemas/user.repository";
import {WeeklyEmailSchedule} from "./managers/weekly-email-schedule.service";
import {Injectable, Logger} from "@nestjs/common";

@Injectable()
export class ScheduleLoader {
    private readonly logger = new Logger(ScheduleLoader.name)

    constructor(private readonly schedulesRepository: SchedulesRepository,
                private readonly userRepo: UserRepository,
                private readonly dailyEmailSchedule: DailyEmailSchedule,
                private readonly weeklyEmailSchedule: WeeklyEmailSchedule) {
    }
    
    async load() {
        const schedules = await this.schedulesRepository.find({});

        this.logger.debug(`Load: ${schedules.length} schedules.` )
        for (const schedule of schedules) {
            this.logger.debug(`Load: ${schedule.createOptions.type}  - ${JSON.stringify(schedule.createOptions)}`)
            const user = await this.userRepo.findOne(schedule.userId);
            switch (schedule.createOptions.type) {
            case DailyEmailSchedule.type:
                this.logger.debug(`DailyEmail load: ${new Date(schedule.createOptions.date).toLocaleTimeString()}`)
                await this.dailyEmailSchedule.createSchedule({
                    id: user._id,
                    username: user.username
                }, schedule.createOptions);
                break;
            case WeeklyEmailSchedule.type:
                await this.weeklyEmailSchedule.createSchedule({
                    id: user._id,
                    username: user.username
                }, schedule.createOptions)
                break;
            default:
                throw new Error(`type: ${schedule.createOptions.type} is not correct`)
            }
        }
    }
}
