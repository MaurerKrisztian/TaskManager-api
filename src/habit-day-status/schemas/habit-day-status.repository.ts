import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HabitDayStatus, HabitDayStatusDocument} from './habit-day-status.schema';
import {CrudService} from "../../services/crud.service";


export class HabitDayStatusRepository extends CrudService<HabitDayStatusDocument> {
    constructor(
    @InjectModel(HabitDayStatus.name) protected readonly habitDayStatusModel: Model<HabitDayStatusDocument>,
    ) {
        super(habitDayStatusModel);
    }

    findOneAndUpdate(id: string, update: any) {
        return this.habitDayStatusModel.findOneAndUpdate({ _id: id }, update);
    }
}
