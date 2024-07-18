/* eslint-disable prettier/prettier */

import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Account } from './database/schemas/account';
import { Stream } from './database/schemas/stream';
import { Paged } from './types';
import { Video } from './database/schemas/video';
import { Channel } from './database/schemas/channel';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('/create-account')
  createAccount(
    @Body() dto: Account
  ): Promise<Account | null> {
    return this.appService.createAccount(
      dto.address.toLocaleLowerCase(),
      dto.name,
      dto.email,
      dto.image
    );
  }

  @Post('/create-channel')
  createChannel(
    @Body() dto: Channel
  ): Promise<Channel | null> {
    return this.appService.createChannel(
      (dto.owner as string).toLocaleLowerCase(),
      dto.name,
      dto.image,
      dto.cover
    );
  }

  @Post('/follow-account/:address')
  followAccount(
    @Param('address') address: string,
    @Body() streamer: string
  ): Promise<boolean> {
    return this.appService.followAccount(
      address.toLocaleLowerCase(),
      streamer.toLocaleLowerCase(),
    );
  }

  @Post('/unfollow-account/:address')
  unfollowAccount(
    @Param('address') address: string,
    @Body() streamer: string
  ): Promise<boolean> {
    return this.appService.unfollowAccount(
      address.toLocaleLowerCase(),
      streamer.toLocaleLowerCase(),
    );
  }

  @Post('/create-stream')
  createStream(
    @Body() dto: Stream
  ): Promise<Stream | null> {
    return this.appService.createStream(
      dto.streamId,
      (dto.streamer as string).toLocaleLowerCase(),
      dto.name,
      dto.thumbnail,
      dto.exclusive,
      dto.playback_uri,
      dto.player_uri,
      dto.tips,
      dto.start_at,
    );
  }

  @Post('/start-stream/:streamId')
  startStream(
    @Param('streamId') streamId: string,
    @Body() txHash: string
  ): Promise<boolean> {
    return this.appService.startStream(
      streamId, txHash
    );
  }

  @Post('/join-stream/:address')
  joinStream(
    @Param('address') address: string,
    @Body() streamId: string
  ): Promise<boolean> {
    return this.appService.joinStream(
      address.toLocaleLowerCase(),
      streamId,
    );
  }

  @Post('/upload-video')
  uploadVideo(
    @Body() dto: Video
  ): Promise<Video | null> {
    return this.appService.uploadVideo(
      dto.videoId,
      (dto.streamer as string).toLocaleLowerCase(),
      dto.name,
      dto.thumbnail,
      dto.exclusive,
      dto.playback_uri,
      dto.tips
    );
  }

  @Post('/watch-video/:address')
  watchVideo(
    @Param('address') address: string,
    @Body() videoId: string
  ): Promise<boolean> {
    return this.appService.watchVideo(
      address.toLocaleLowerCase(),
      videoId,
    );
  }

  @Get('/streams')
  getStreams(
    @Query('page') page: number,
    @Query('streamer') address: string | null
  ): Promise<Paged<Stream[]> | null> {
    return this.appService.getStreams(
      page,
      address.toLocaleLowerCase(),
    );
  }

  @Get('/streams/:id')
  getStream(
    @Param('id') streamId: string,
  ): Promise<Stream | null> {
    return this.appService.getStream(
      streamId
    );
  }

  @Get('/videos')
  getVideos(
    @Query('page') page: number,
    @Query('streamer') address: string | null
  ): Promise<Paged<Video[]> | null> {
    return this.appService.getVideos(
      page,
      address.toLocaleLowerCase(),
    );
  }

  @Get('/videos/:id')
  getVideo(
    @Param('id') videoId: string,
  ): Promise<Video | null> {
    return this.appService.getVideo(
      videoId
    );
  }

  @Get('/accounts/:id')
  getAccount(
    @Param('id') address: string,
  ): Promise<Account | null> {
    return this.appService.getAccount(
      address.toLocaleLowerCase()
    );
  }

  @Get('/channels')
  getChannels(
    @Query('page') page: number
  ): Promise<Paged<Channel[]> | null> {
    return this.appService.getChannels(page);
  }

  @Get('/channels/:id')
  getChannel(
    @Param('id') address: string,
  ): Promise<Channel | null> {
    return this.appService.getChannel(
      address.toLocaleLowerCase()
    );
  }
}
