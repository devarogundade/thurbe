/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Account } from './account';

export type StreamDocument = HydratedDocument<Stream>;

@Schema()
export class Stream {
    @Prop({ required: true, _id: true, unique: true })
    streamId: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    thumbnail: string;

    @Prop({ required: true, type: Types.ObjectId, ref: Account.name })
    streamer: Account | string;

    @Prop({ default: null })
    playback_uri: string | null;

    @Prop({ default: null })
    player_uri: string | null;

    @Prop({ default: null })
    stream_server: string | null;

    @Prop({ default: null })
    stream_key: string | null;

    @Prop({ required: true })
    tips: boolean;

    @Prop({ required: true, type: [Types.ObjectId], ref: Account.name })
    viewers: Account[];

    @Prop({ default: null })
    collection: string | null;

    @Prop({ required: true })
    created_at: Date;

    @Prop({ required: true })
    start_at: Date;

    @Prop({ default: false })
    mailSent: boolean;
}

export const StreamSchema = SchemaFactory.createForClass(Stream);