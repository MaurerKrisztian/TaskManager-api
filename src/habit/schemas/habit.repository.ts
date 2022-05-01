import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Habit, HabitDocument} from './habit.schema';
import {CrudService} from "../../services/crud.service";


export class HabitRepository extends CrudService<HabitDocument> {
    constructor(
    @InjectModel(Habit.name) protected readonly habitModel: Model<HabitDocument>,
    ) {
        super(habitModel);
    }

    findOneAndUpdate(id: string, update: any) {
        return this.habitModel.findOneAndUpdate({ _id: id }, update);
    }
}
