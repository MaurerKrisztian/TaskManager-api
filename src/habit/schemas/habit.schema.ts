import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HabitDocument = Habit & Document;

@Schema({
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
})
export class Habit implements IHabit {
    _id: string;
    
  @Prop({ type: String, required: true })
      userId: string;
  
  @Prop({ type: String, required: true })
      name: string;

   @Prop({ type: Date, required: true })
       startDate: Date;
   
   @Prop({ type: String, required: false })
       description?: string;
}

export const HabitSchema = SchemaFactory.createForClass(Habit);

export interface IHabit {
    name: string;
    description?: string;
    startDate: Date;
    userId:string
    createdAt?: Date;
    _id: string;
}
