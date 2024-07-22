/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Channel } from './channel';
import { Stream } from './stream';
import { Video } from './video';

export type AccountDocument = HydratedDocument<Account>;

@Schema()
export class Account {
    @Prop({ required: true, _id: true, unique: true })
    _id: string;

    @Prop({ required: true, unique: true })
    address: string;

    @Prop({ required: true })
    name: string;

    @Prop({ default: null })
    email: string | null;

    @Prop({ default: null })
    image: string | null;

    @Prop({ required: true, type: [Types.ObjectId], ref: Account.name })
    followers: Account[];

    @Prop({ default: null, type: Types.ObjectId, ref: Channel.name })
    channel: Channel | null;

    @Prop({ required: true, type: [Types.ObjectId], ref: Video.name })
    videos: Video[];

    @Prop({ required: true, type: [Types.ObjectId], ref: Stream.name })
    streams: Stream[];

    @Prop({ required: true })
    created_at: Date;
}

export const AccountSchema = SchemaFactory.createForClass(Account);