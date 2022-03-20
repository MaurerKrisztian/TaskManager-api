import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type UserDocument = User & Document;

@Schema({toJSON: {virtuals: true}, toObject: {virtuals: true}, timestamps: true})
export class User {
    @Prop({type: String, required: true})
    username: string;

    @Prop({type: String, required: true})
    password: string;

    @Prop({
        type: String, required: false, default(val: any): any {
            return 'user'
        }
    })
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export interface IUser {
    username: string;
    password: string;
    role: string;
}
