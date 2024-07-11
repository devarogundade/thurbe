/* eslint-disable prettier/prettier */

import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Account } from './database/schemas/account';
import { Stream } from './database/schemas/stream';
import { Paged } from './types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('/create-account')
  createAccount(
    @Body() dto: Account
  ): Promise<Account | null> {
    return this.appService.createAccount(
      dto.address,
      dto.name,
      dto.email,
      dto.image
    );
  }

  @Post('/follow-account/:address')
  followAccount(
    @Param('address') address: string,
    @Body() streamer: string
  ): Promise<boolean> {
    return this.appService.followAccount(
      address,
      streamer,
    );
  }

  @Post('/unfollow-account/:address')
  unfollowAccount(
    @Param('address') address: string,
    @Body() streamer: string
  ): Promise<boolean> {
    return this.appService.unfollowAccount(
      address,
      streamer,
    );
  }

  @Post('/start-stream')
  startStream(
    @Body() dto: Stream
  ): Promise<Stream | null> {
    return this.appService.startStream(
      dto.streamId,
      dto.creator as string,
      dto.name,
      dto.thumbnail,
      dto.collection,
      dto.playback_uri,
      dto.player_uri,
      dto.tips,
      dto.start_at,
    );
  }

  @Post('/join-stream/:address')
  joinStream(
    @Param('address') address: string,
    @Body() streamId: string
  ): Promise<boolean> {
    return this.appService.joinStream(
      address,
      streamId,
    );
  }

  @Get('/streams')
  getStreams(
    @Query('page') page: number,
    @Query('creator') creator: string | null
  ): Promise<Paged<Stream[]> | null> {
    return this.appService.getStreams(
      page,
      creator,
    );
  }

  @Get('/stream/:id')
  getStream(
    @Param('id') streamId: string,
  ): Promise<Stream | null> {
    return this.appService.getStream(
      streamId
    );
  }

  @Get('/accounts/:id')
  getAccount(
    @Param('address') address: string,
  ): Promise<Account | null> {
    return this.appService.getAccount(
      address
    );
  }
}
