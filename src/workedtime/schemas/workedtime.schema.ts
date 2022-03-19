import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type WorkedtimeDocument = Workedtime & Document;

@Schema({toJSON: {virtuals: true}, toObject: {virtuals: true}, timestamps: true})
export class Workedtime implements IWorkSession{
    @Prop({type: String, required: true})
    taskId: string;

    @Prop({type: Date, required: true})
    start: Date;

    @Prop({type: Date, required: false})
    end?: Date;
}

export const WorkedtimeSchema = SchemaFactory.createForClass(Workedtime);


export interface IWorkSession {

    taskId: string;

    start: Date;

    end?: Date;
}
