/* eslint-disable prettier/prettier */

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobsOptions, Queue } from 'bullmq';
import { Injectable } from '@nestjs/common';
import { Account } from './database/schemas/account';
import { Stream } from './database/schemas/stream';
import { Paged, StreamType, ViewerType } from './types';
import { Video } from './database/schemas/video';
import { InjectQueue } from '@nestjs/bullmq';
import { Channel } from './database/schemas/channel';

const TAKE_SIZE: number = 48;

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
        _id: address,
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
        _id: owner,
        owner,
        name,
        image,
        cover,
        created_at: new Date()
      };

      await this.accountModel.updateOne(
        { address: owner },
        {
          $set: {
            channel: owner
          }
        }
      );

      return this.channelModel.create(channel);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async followAccount(
    streamer: string,
    viewer: string
  ): Promise<boolean> {
    try {
      await this.accountModel.updateOne({
        address: streamer
      }, {
        $addToSet: {
          followers: viewer
        }
      });

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async unfollowAccount(
    streamer: string,
    viewer: string
  ): Promise<boolean> {
    try {
      await this.accountModel.updateOne({
        address: streamer
      }, {
        $pull: {
          followers: viewer
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
    description: string | null,
    thetaId: string | null,
    stream_server: string | null,
    stream_key: string | null,
    thumbnail: string,
    viewerType: ViewerType,
    streamType: StreamType,
    tips: boolean,
    start_at: Date
  ): Promise<Stream | null> {
    try {
      const exists = await this.streamModel.exists({ streamId });
      if (exists) return null;

      const stream: Stream = {
        _id: streamId,
        streamId,
        name,
        description,
        thumbnail,
        streamer: address,
        thetaId,
        stream_server,
        stream_key,
        tips,
        viewerType,
        created_at: new Date(),
        start_at,
        viewers: [],
        likes: [],
        dislikes: [],
        streamType,
        live: false
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

  async joinStream(
    viewer: string,
    streamId: string
  ): Promise<boolean> {
    try {
      if (viewer != 'undefined') {
        await this.streamModel.updateOne({
          streamId, live: true
        }, {
          $addToSet: {
            viewers: viewer
          }
        });
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async likeStream(
    viewer: string,
    streamId: string
  ): Promise<boolean> {
    try {
      await this.streamModel.updateOne({
        streamId, live: true
      }, {
        $addToSet: {
          likes: viewer
        },
        $pull: {
          dislikes: viewer
        }
      });

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async likeVideo(
    viewer: string,
    videoId: string
  ): Promise<boolean> {
    try {
      await this.videoModel.updateOne({
        videoId
      }, {
        $addToSet: {
          likes: viewer
        },
        $pull: {
          dislikes: viewer
        }
      });

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async dislikeStream(
    viewer: string,
    streamId: string
  ): Promise<boolean> {
    try {
      await this.streamModel.updateOne({
        streamId, live: true
      }, {
        $addToSet: {
          dislikes: viewer
        },
        $pull: {
          likes: viewer
        }
      });

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async dislikeVideo(
    viewer: string,
    videoId: string
  ): Promise<boolean> {
    try {
      await this.videoModel.updateOne({
        videoId
      }, {
        $addToSet: {
          dislikes: viewer
        },
        $pull: {
          likes: viewer
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
    description: string | null,
    thumbnail: string,
    viewerType: ViewerType,
    thetaId: string | null,
    tips: boolean,
  ): Promise<Video | null> {
    try {
      const exists = await this.videoModel.exists({ videoId });
      if (exists) return null;

      const video: Video = {
        _id: videoId,
        videoId,
        name,
        description,
        thumbnail,
        streamer: address,
        thetaId,
        tips,
        viewerType,
        created_at: new Date(),
        viewers: [],
        views: 0,
        likes: [],
        dislikes: []
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
    viewer: string,
    videoId: string
  ): Promise<boolean> {
    try {
      if (viewer == 'undefined') {
        await this.videoModel.updateOne({
          videoId
        }, {
          $inc: {
            views: 1
          }
        });
      } else {
        await this.videoModel.updateOne({
          videoId
        }, {
          $addToSet: {
            viewers: viewer
          },
          $inc: {
            views: 1
          }
        });
      }

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
        .populate({
          path: 'streamer',
          populate: {
            path: 'channel'
          }
        })
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
        .populate({
          path: 'streamer',
          populate: {
            path: 'channel'
          }
        })
        .exec();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async updateStream(
    streamId: string,
    streamServer: string,
    streamKey: string
  ): Promise<boolean> {
    try {
      this.streamModel.updateOne(
        { streamId, live: false },
        {
          $set: {
            stream_server: streamServer,
            stream_key: streamKey,
            live: true
          }
        }
      ).exec();

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

  async endStream(
    streamId: string,
  ): Promise<boolean> {
    try {
      this.streamModel.updateOne(
        { streamId, live: true },
        {
          $set: {
            stream_server: null,
            stream_key: null,
            live: false
          }
        }
      ).exec();

      return true;
    } catch (error) {
      console.error(error);
      return false;
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
        .sort({ created_at: 'desc' })
        .populate({
          path: 'streamer',
          populate: {
            path: 'channel'
          }
        })
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
        .populate({
          path: 'streamer',
          populate: {
            path: 'channel'
          }
        })
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
        .populate(['channel'])
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
      return this.channelModel.findOne({ owner: address })
        .populate(['owner'])
        .exec();
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
