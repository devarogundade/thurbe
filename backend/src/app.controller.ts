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

  @Post('/follow-account/:streamer/:viewer')
  followAccount(
    @Param('streamer') streamer: string,
    @Param('viewer') viewer: string
  ): Promise<boolean> {
    return this.appService.followAccount(
      streamer.toLocaleLowerCase(),
      viewer.toLocaleLowerCase(),
    );
  }

  @Post('/unfollow-account/:streamer/:viewer')
  unfollowAccount(
    @Param('streamer') streamer: string,
    @Param('viewer') viewer: string
  ): Promise<boolean> {
    return this.appService.unfollowAccount(
      streamer.toLocaleLowerCase(),
      viewer.toLocaleLowerCase(),
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
      dto.description,
      dto.thetaId,
      dto.stream_server,
      dto.stream_key,
      dto.thumbnail,
      dto.viewerType,
      dto.streamType,
      dto.tips,
      dto.start_at,
    );
  }

  @Post('/start-stream/:streamId')
  startStream(
    @Param('streamId') streamId: string,
    @Query('streamServer') streamServer: string,
    @Query('streamKey') streamKey: string
  ): Promise<boolean> {
    return this.appService.updateStream(
      streamId, streamServer, streamKey
    );
  }

  @Post('/end-stream/:streamId')
  endStream(
    @Param('streamId') streamId: string
  ): Promise<boolean> {
    return this.appService.endStream(
      streamId
    );
  }

  @Post('/join-stream/:viewer/:streamId')
  joinStream(
    @Param('viewer') viewer: string,
    @Param('streamId') streamId: string
  ): Promise<boolean> {
    return this.appService.joinStream(
      viewer.toLocaleLowerCase(),
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
      dto.description,
      dto.thumbnail,
      dto.viewerType,
      dto.thetaId,
      dto.tips
    );
  }

  @Post('/watch-video/:viewer/:videoId')
  watchVideo(
    @Param('viewer') viewer: string,
    @Param('videoId') videoId: string
  ): Promise<boolean> {
    return this.appService.watchVideo(
      viewer.toLocaleLowerCase(),
      videoId,
    );
  }

  @Post('/like-stream/:viewer/:streamId')
  likeStream(
    @Param('viewer') viewer: string,
    @Param('streamId') streamId: string
  ): Promise<boolean> {
    return this.appService.likeStream(
      viewer.toLocaleLowerCase(),
      streamId,
    );
  }

  @Post('/like-video/:viewer/:videoId')
  likeVideo(
    @Param('viewer') viewer: string,
    @Param('videoId') videoId: string
  ): Promise<boolean> {
    return this.appService.likeVideo(
      viewer.toLocaleLowerCase(),
      videoId,
    );
  }

  @Post('/dislike-stream/:viewer/:streamId')
  dislikeStream(
    @Param('viewer') viewer: string,
    @Param('streamId') streamId: string
  ): Promise<boolean> {
    return this.appService.dislikeStream(
      viewer.toLocaleLowerCase(),
      streamId,
    );
  }

  @Post('/dislike-video/:viewer/:videoId')
  dislikeVideo(
    @Param('viewer') viewer: string,
    @Param('videoId') videoId: string
  ): Promise<boolean> {
    return this.appService.dislikeVideo(
      viewer.toLocaleLowerCase(),
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
