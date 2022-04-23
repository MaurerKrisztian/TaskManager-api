import { CrudService } from '../../services/crud.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Label, LabelDocument} from './label.schema';

export class LabelRepository extends CrudService<LabelDocument> {
    constructor(
    @InjectModel(Label.name) protected readonly labelModel: Model<LabelDocument>,
    ) {
        super(labelModel);
    }

    findOneAndUpdate(id: string, update: any) {
        return this.labelModel.findOneAndUpdate({ _id: id }, update);
    }
}
