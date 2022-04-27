import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FoodMacrosDocument = FoodMacros & Document;

@Schema({
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
})
export class FoodMacros implements IFoodMacros {
  @Prop({ type: String, required: true })
      userId: string;

  @Prop({ type: Date, required: false, default: new Date() })
      date: Date;

  @Prop({ type: Number, required: true})
      carbohydrates: number;

  @Prop({ type: Number, required: true})
      fat: number;
    
  @Prop({ type: Number, required: true})
      protein: number;
}

export const FoodMacrosSchema = SchemaFactory.createForClass(FoodMacros);

export interface IFoodMacros {
    userId:string
    date: Date,
    createdAt?: Date;
    protein: number,
    carbohydrates: number,
    fat: number,
}
