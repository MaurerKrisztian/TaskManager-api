import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({toJSON: {virtuals: true}, toObject: {virtuals: true}, timestamps: true})
export class Task implements ITask {

    @Prop({type: String, required: true})
    userId: string;

    @Prop({type: String, required: true})
    title: string;

    @Prop({type: String, required: true})
    description: string;

    @Prop({type: Boolean, required: true})
    isCompleted: boolean;

    @Prop({type: String, required: false})
    boardId?: string

    @Prop({type: Date, required: true})
    createdAt: Date;

    @Prop({type: Date, required: false})
    startAt?: Date;

    @Prop({type: [String], required: false})
    labels?: string[];

    @Prop({
        type: [String], default(val: any): any {
            return []
        }
    })
    fileIds: string[] = []

}

export const TaskSchema = SchemaFactory.createForClass(Task);


export interface ITask {
    title: string;

    description: string;

    createdAt: Date;
    startAt?: Date;

    isCompleted: boolean;

    boardId?: string

    userId: string
}
