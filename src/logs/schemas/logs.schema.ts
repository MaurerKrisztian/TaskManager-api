import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { TaskDocument } from '../../task/schemas/task.schema';
import { UserDocument } from '../../user/schemas/user.schema';

export type LogsDocument = Log & Document;

@Schema({
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  timestamps: true,
})
export class Log implements ILog {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: UserDocument;

  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: mongoose.Schema.Types.Mixed, required: true })
  content: any;
}

export const LogsSchema = SchemaFactory.createForClass(Log);

export interface ILog {
  userId: string | UserDocument;

  type: string;

  content: any;
}
