import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {IScheduleData} from "../scheduelers/managers/DailyEmailSchedule";

export type SchedulesDocument = Schedules & Document;

@Schema({
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
})
export class Schedules implements ISchedules<any> {
    @Prop({ type: String, required: true })
        userId: string;

    @Prop({ type: Object, required: false })
        createOptions: any & IScheduleData
}

export const SchedulesSchema = SchemaFactory.createForClass(Schedules);

export interface ISchedules<T> {
    userId: string,
    createOptions: T & IScheduleData
}
