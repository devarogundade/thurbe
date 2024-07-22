/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Account } from './account';
import { ViewerType } from 'src/types';

export type VideoDocument = HydratedDocument<Video>;

@Schema()
export class Video {
    @Prop({ required: true, unique: true })
    _id: string;

    @Prop({ required: true, unique: true })
    videoId: string;

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

    @Prop({ required: true })
    tips: boolean;

    @Prop({ required: true, type: [Types.ObjectId], ref: 'Account' })
    viewers: Account[];

    @Prop({ default: 0 })
    views: number;

    @Prop({ default: [] })
    likes: string[];

    @Prop({ default: [] })
    dislikes: string[];

    @Prop({ required: true })
    viewerType: ViewerType;

    @Prop({ required: true })
    created_at: Date;
}

export const VideoSchema = SchemaFactory.createForClass(Video);