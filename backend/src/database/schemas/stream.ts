/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Account } from './account';
import { ViewerType, StreamType } from 'src/types';

export type StreamDocument = HydratedDocument<Stream>;

@Schema()
export class Stream {
    @Prop({ required: true, unique: true })
    _id: string;

    @Prop({ required: true, unique: true })
    streamId: string;

    @Prop({ required: true })
    name: string;

    @Prop({ default: null })
    description: string | null;

    @Prop({ required: true })
    thumbnail: string;

    @Prop({ required: true, type: Types.ObjectId, ref: 'Account' })
    streamer: Account | string;

    @Prop({ default: null })
    thetaId: string | null;

    @Prop({ default: null })
    stream_server: string | null;

    @Prop({ default: null })
    stream_key: string | null;

    @Prop({ required: true })
    tips: boolean;

    @Prop({ required: true, type: [Types.ObjectId], ref: 'Account' })
    viewers: Account[];

    @Prop({ default: [] })
    likes: string[];

    @Prop({ default: [] })
    dislikes: string[];

    @Prop({ required: true })
    viewerType: ViewerType;

    @Prop({ required: true })
    streamType: StreamType;

    @Prop({ required: true })
    created_at: Date;

    @Prop({ default: false })
    live: boolean;

    @Prop({ required: true })
    start_at: Date;
}

export const StreamSchema = SchemaFactory.createForClass(Stream);