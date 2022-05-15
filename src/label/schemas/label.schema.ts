import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LabelDocument = Label & Document;

@Schema({
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
})
export class Label implements ILabel {
  @Prop({ type: String, required: true })
      userId: string;

    @Prop({ type: String, required: false, default: "red" })
        color: string;

    @Prop({ type: String, required: true, unique: true})
        name: string;

    @Prop({ type: String, required: false})
        description: string;
}

export const LabelSchema = SchemaFactory.createForClass(Label);

export interface ILabel {
    name: string;
    description?: string,
    color: string,
    userId: string;
    createdAt?: Date;
}
