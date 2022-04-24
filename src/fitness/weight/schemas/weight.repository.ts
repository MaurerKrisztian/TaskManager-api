import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Weight, WeightDocument} from './weight.schema';
import {CrudService} from "../../../services/crud.service";

export class WeightRepository extends CrudService<WeightDocument> {
    constructor(
    @InjectModel(Weight.name) protected readonly weightModel: Model<WeightDocument>,
    ) {
        super(weightModel);
    }

    findOneAndUpdate(id: string, update: any) {
        return this.weightModel.findOneAndUpdate({ _id: id }, update);
    }
}
