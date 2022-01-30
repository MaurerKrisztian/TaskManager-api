import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type UserDocument = User & Document;

@Schema({toJSON: {virtuals: true}, toObject: {virtuals: true}})
export class User {
    @Prop({type: String, required: true})
    username: string;

    @Prop({type: String, required: true})
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);