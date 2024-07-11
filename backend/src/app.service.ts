/* eslint-disable prettier/prettier */

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Account } from './database/schemas/account';
import { Stream } from './database/schemas/stream';
import { Paged } from './types';

const TAKE_SIZE: number = 25;

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Stream.name) private streamModel: Model<Stream>,
    @InjectModel(Account.name) private accountModel: Model<Account>,
  ) {
  }

  async createAccount(
    address: string,
    name: string,
    email: string,
    image: string | null
  ): Promise<Account | null> {
    try {
      const account: Account = {
        address,
        name,
        email,
        image,
        created_at: new Date(),
        followers: []
      };

      await this.accountModel.updateOne(
        { address }, account, { upsert: true }
      );

      return account;
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

  async startStream(
    streamId: string,
    address: string,
    name: string,
    thumbnail: string,
    collection: string,
    playback_uri: string | null,
    player_uri: string | null,
    tips: boolean,
    start_at: Date
  ): Promise<Stream | null> {
    try {
      const stream: Stream = {
        streamId,
        name,
        thumbnail,
        creator: address,
        playback_uri,
        player_uri,
        stream_server: '',
        stream_key: '',
        tips,
        collection,
        created_at: new Date(),
        start_at,
        viewers: [],
        mailSent: false
      };

      return await this.streamModel.create(stream);
    } catch (error) {
      console.error(error);
      return null;
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

  async getStreams(
    page: number,
    creator?: string
  ): Promise<Paged<Stream[]> | null> {
    try {
      const filter = (creator != 'undefined') ? { creator } : {};

      const total = await this.streamModel.countDocuments(filter);

      const data = await this.streamModel.find(filter)
        .limit(TAKE_SIZE * 1)
        .skip((page - 1) * TAKE_SIZE)
        .sort({ start_at: 'desc' })
        .populate(['creator'])
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
        .populate(['creator'])
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
        .populate(['followers'])
        .exec();
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
