import {IWeight} from "../schemas/weight.schema";

export class CreateWeightDto implements IWeight {
    date: Date;
    userId: string;
    weight: number;
}
