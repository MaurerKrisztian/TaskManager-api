import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {FoodMacros, FoodMacrosDocument} from './foodMacros.schema';
import {CrudService} from "../../../services/crud.service";
export class FoodMacrosRepository extends CrudService<FoodMacrosDocument> {
    constructor(
    @InjectModel(FoodMacros.name) protected readonly foodMacrosModel: Model<FoodMacrosDocument>,
    ) {
        super(foodMacrosModel);
    }

    findOneAndUpdate(id: string, update: any) {
        return this.foodMacrosModel.findOneAndUpdate({ _id: id }, update);
    }
}
