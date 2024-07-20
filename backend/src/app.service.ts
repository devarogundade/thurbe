/* eslint-disable prettier/prettier */

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobsOptions, Queue } from 'bullmq';
import { Injectable } from '@nestjs/common';
import { Account } from './database/schemas/account';
import { Stream } from './database/schemas/stream';
import { Paged } from './types';
import { Video } from './database/schemas/video';
import { InjectQueue } from '@nestjs/bullmq';
import { Channel } from './database/schemas/channel';

const TAKE_SIZE: number = 14;

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Stream.name) private streamModel: Model<Stream>,
    @InjectModel(Account.name) private accountModel: Model<Account>,
    @InjectModel(Video.name) private videoModel: Model<Video>,
    @InjectModel(Channel.name) private channelModel: Model<Channel>,
    @InjectQueue('MailWorker') private queue: Queue
  ) {
  }

  async createAccount(
    address: string,
    name: string,
    email: string | null,
    image: string | null
  ): Promise<Account | null> {
    try {
      const exists = await this.accountModel.exists({ address });
      if (exists) return null;

      const account: Account = {
        address,
        name,
        email,
        image,
        created_at: new Date(),
        followers: [],
        channel: null,
        videos: [],
        streams: []
      };

      return this.accountModel.create(account);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async createChannel(
    owner: string,
    name: string,
    image: string,
    cover: string | null
  ): Promise<Channel | null> {
    try {
      const exists = await this.channelModel.exists({ owner });
      if (exists) return null;

      const channel: Channel = {
        owner,
        name,
        image,
        cover,
        created_at: new Date()
      };

      return this.channelModel.create(channel);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async followAccount(
    address: string,
    streamer: string
  ): Promise<boolean> {
    try {
      await this.accountModel.updateOne({
        address
      }, {
        $addToSet: {
          followers: streamer
        }
      });

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async unfollowAccount(
    address: string,
    streamer: string
  ): Promise<boolean> {
    try {
      await this.accountModel.updateOne({
        address
      }, {
        $pull: {
          followers: streamer
        }
      });

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async createStream(
    streamId: string,
    address: string,
    name: string,
    thumbnail: string,
    exclusive: boolean,
    playback_uri: string | null,
    player_uri: string | null,
    tips: boolean,
    start_at: Date
  ): Promise<Stream | null> {
    try {
      const exists = await this.streamModel.exists({ streamId });
      if (exists) return null;

      const stream: Stream = {
        streamId,
        name,
        thumbnail,
        streamer: address,
        playback_uri,
        player_uri,
        stream_server: '',
        stream_key: '',
        tx_hash: null,
        tips,
        exclusive,
        created_at: new Date(),
        start_at,
        viewers: []
      };

      const jobOptions: JobsOptions = {
        removeOnComplete: true,
        removeOnFail: true
      };

      this.queue.add(streamId, { streamId, started: false },
        jobOptions
      );

      await this.accountModel.updateOne(
        { address },
        {
          $addToSet: {
            streams: streamId
          },
        }
      );

      return await this.streamModel.create(stream);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async startStream(
    streamId: string,
    tx_hash: string,
  ): Promise<boolean> {
    try {
      await this.streamModel.updateOne({ streamId }, {
        tx_hash
      });

      const jobOptions: JobsOptions = {
        removeOnComplete: true,
        removeOnFail: true
      };

      this.queue.add(streamId, { streamId, started: true },
        jobOptions
      );

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async joinStream(
    streamId: string,
    streamer: string
  ): Promise<boolean> {
    try {
      await this.streamModel.updateOne({
        streamId
      }, {
        $addToSet: {
          viewers: streamer
        }
      });

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async uploadVideo(
    videoId: string,
    address: string,
    name: string,
    thumbnail: string,
    exclusive: boolean,
    playback_uri: string | null,
    tips: boolean,
  ): Promise<Video | null> {
    try {
      const exists = await this.videoModel.exists({ videoId });
      if (exists) return null;

      const video: Video = {
        videoId,
        name,
        thumbnail,
        streamer: address,
        playback_uri,
        tips,
        exclusive,
        created_at: new Date(),
        viewers: [],
        views: 0
      };

      await this.accountModel.updateOne(
        { address },
        {
          $addToSet: {
            videos: videoId
          },
        }
      );

      return await this.videoModel.create(video);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async watchVideo(
    videoId: string,
    streamer: string
  ): Promise<boolean> {
    try {
      await this.videoModel.updateOne({
        videoId
      }, {
        $addToSet: {
          viewers: streamer
        },
        $inc: {
          views: 1
        }
      });

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getStreams(
    page: number,
    streamer?: string
  ): Promise<Paged<Stream[]> | null> {
    try {
      const filter = (streamer != 'undefined') ? { streamer } : {};

      const total = await this.streamModel.countDocuments(filter);

      const data = await this.streamModel.find(filter)
        .limit(TAKE_SIZE * 1)
        .skip((page - 1) * TAKE_SIZE)
        .sort({ start_at: 'desc' })
        .populate(['streamer'])
        .exec();

      const lastPage = Math.ceil(total / TAKE_SIZE);

      return { total, lastPage, data };
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getStream(
    streamId: string
  ): Promise<Stream | null> {
    try {
      return this.streamModel.findOne({ streamId })
        .populate(['streamer'])
        .exec();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getVideos(
    page: number,
    streamer?: string
  ): Promise<Paged<Video[]> | null> {
    try {
      const filter = (streamer != 'undefined') ? { streamer } : {};

      const total = await this.videoModel.countDocuments(filter);

      const data = await this.videoModel.find(filter)
        .limit(TAKE_SIZE * 1)
        .skip((page - 1) * TAKE_SIZE)
        .sort({ start_at: 'desc' })
        .populate(['streamer'])
        .exec();

      const lastPage = Math.ceil(total / TAKE_SIZE);

      return { total, lastPage, data };
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getVideo(
    videoId: string
  ): Promise<Video | null> {
    try {
      return this.videoModel.findOne({ videoId })
        .populate(['streamer'])
        .exec();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getAccount(
    address: string
  ): Promise<Account | null> {
    try {
      return this.accountModel.findOne({ address })
        .exec();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getChannels(
    page: number,
  ): Promise<Paged<Channel[]> | null> {
    try {
      const total = await this.channelModel.countDocuments();

      const data = await this.channelModel.find()
        .limit(TAKE_SIZE * 1)
        .skip((page - 1) * TAKE_SIZE)
        .sort({ start_at: 'desc' })
        .populate(['owner'])
        .exec();

      const lastPage = Math.ceil(total / TAKE_SIZE);

      return { total, lastPage, data };
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getChannel(
    address: string
  ): Promise<Channel | null> {
    try {
      return this.channelModel.findOne({ address })
        .populate(['owner'])
        .exec();
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
