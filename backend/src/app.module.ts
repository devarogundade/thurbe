/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bullmq';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { VideoSchema } from './database/schemas/video';
import { Stream, StreamSchema } from './database/schemas/stream';
import { Account, AccountSchema } from './database/schemas/account';
import { MailWorker } from './worker/mail';
// import { ScheduleModule } from '@nestjs/schedule';
import { MainGateway } from './socket/main.gateway';
import { Video } from './database/schemas/video';
import { Channel, ChannelSchema } from './database/schemas/channel';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT, 10)
      }
    }),
    BullModule.registerQueue({ name: 'MailWorker' }),
    // ScheduleModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    MongooseModule.forFeature([
      { name: Stream.name, schema: StreamSchema },
      { name: Account.name, schema: AccountSchema },
      { name: Video.name, schema: VideoSchema },
      { name: Channel.name, schema: ChannelSchema },
    ])
  ],
  controllers: [AppController],
  providers: [AppService, MailWorker, MainGateway],
})
export class AppModule { }
