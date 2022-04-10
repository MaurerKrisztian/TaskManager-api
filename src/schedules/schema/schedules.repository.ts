import { CrudService } from '../../services/crud.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Schedules, SchedulesDocument} from "./schedules.schema";

export class SchedulesRepository extends CrudService<SchedulesDocument> {
    constructor(
    @InjectModel(Schedules.name) protected readonly schedulesModel: Model<SchedulesDocument>,
    ) {
        super(schedulesModel);
    }
}
