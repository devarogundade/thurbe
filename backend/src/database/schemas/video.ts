/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Account } from './account';

export type VideoDocument = HydratedDocument<Video>;

@Schema()
export class Video {
    @Prop({ required: true, _id: true, unique: true })
    videoId: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    thumbnail: string;

    @Prop({ required: true, type: Types.ObjectId, ref: Account.name })
    streamer: Account | string;

    @Prop({ default: null })
    playback_uri: string | null;

    @Prop({ required: true })
    tips: boolean;

    @Prop({ required: true, type: [Types.ObjectId], ref: Account.name })
    viewers: Account[];

    @Prop({ default: 0 })
    views: number;

    @Prop({ default: null })
    collection: string | null;

    @Prop({ required: true })
    created_at: Date;
}

export const VideoSchema = SchemaFactory.createForClass(Video);