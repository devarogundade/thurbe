/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AccountDocument = HydratedDocument<Account>;

@Schema()
export class Account {
    @Prop({ required: true, _id: true, unique: true })
    address: string;

    @Prop({ required: true })
    name: string;

    @Prop({ default: null })
    image: string | null;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true, type: [Types.ObjectId], ref: Account.name })
    followers: Account[];

    @Prop({ required: true })
    created_at: Date;
}

export const AccountSchema = SchemaFactory.createForClass(Account);