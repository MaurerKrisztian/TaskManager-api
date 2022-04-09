import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { TaskDocument } from '../../task/schemas/task.schema';

export type TaskBoardDocument = TaskBoard & Document;

@Schema({
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
})
export class TaskBoard {
  @Prop({ type: String, required: true })
      userId: string;

  @Prop({ type: String, required: true })
      name: string;

  @Prop({
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task', default: [] }],
  })
      tasks: TaskDocument[];
}

export const TaskboardSchema = SchemaFactory.createForClass(TaskBoard);
