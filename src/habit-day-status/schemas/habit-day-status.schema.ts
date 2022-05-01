import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HabitDayStatusDocument = HabitDayStatus & Document;

@Schema({
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
})
export class HabitDayStatus implements IHabitDayStatus {
    createdAt?: Date;
    _id: string;
    
  @Prop({ type: String, required: true })
      userId: string;
   
  @Prop({ type: String, required: true })
      status: string;

  @Prop({ type: Date, required: true })
      date: Date;
   
  @Prop({ type: String, required: true })
      note: string;

  @Prop({ type: String, required: true })
      habitId: string;
}

export const HabitDayStatusSchema = SchemaFactory.createForClass(HabitDayStatus);

export interface IHabitDayStatus {
    habitId: string
    status: 'done' | 'not-done' | string
    note: string
    date: Date;
    userId:string
    createdAt?: Date;
    _id: string;
}
