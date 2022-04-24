import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WeightDocument = Weight & Document;

@Schema({
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
})
export class Weight implements IWeight {
  @Prop({ type: String, required: true })
      userId: string;

  @Prop({ type: Date, required: false, default: new Date() })
      date: Date;

  @Prop({ type: Number, required: true})
      weight: number;
}

export const WeightSchema = SchemaFactory.createForClass(Weight);

export interface IWeight {
    userId:string
    date: Date,
    weight: number,
    createdAt?: Date;
}
