/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Account } from './account';

export type ChannelDocument = HydratedDocument<Channel>;
@Schema()
export class Channel {
    @Prop({ required: true, unique: true })
    _id: string;

    @Prop({ required: true, unique: true, type: Types.ObjectId, ref: 'Account' })
    owner: Account | string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    image: string;

    @Prop({ default: null })
    cover: string | null;

    @Prop({ required: true })
    created_at: Date;
};

export const ChannelSchema = SchemaFactory.createForClass(Channel);