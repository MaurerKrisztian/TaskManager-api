import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({toJSON: {virtuals: true}, toObject: {virtuals: true}})
export class Task implements ITask {
    @Prop({type: String, required: true})
    title: string;

    @Prop({type: String, required: true})
    description: string;

    @Prop({type: Boolean, required: true})
    isCompleted: boolean;

    @Prop({type: String, required: true})
    boardId: string

    @Prop({type: Date, required: true})
    createdAt: Date;

    @Prop({type: Date, required: false})
    startAt?: Date;

    @Prop({type: [String], required: false})
    labels?: string[];

}

export const TaskSchema = SchemaFactory.createForClass(Task);


export interface ITask {
    title: string;

    description: string;

    createdAt: Date;

    isCompleted: boolean;

    boardId: string
}
