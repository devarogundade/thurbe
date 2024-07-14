/* eslint-disable prettier/prettier */

import {
  // ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";

import { Server } from "socket.io";
import { startFFmpeg } from "src/ffmpeg";

@WebSocketGateway()
export class MainGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log("Initialized");
  }

  handleDisconnect(client: any) {
    console.log(`Cliend id:${client.id} disconnected`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleConnection(client: any, ...args: any[]) {
    const { sockets } = this.server.sockets;
    console.log(`Client id: ${client.id} connected`);
    console.debug(`Number of connected clients: ${sockets.size}`);
  }

  @SubscribeMessage('reaction')
  handleReaction(
    @MessageBody() data: any,
    // @ConnectedSocket() client: any,
  ): void {
    this.server.emit(`channel-${data.channelId}-reaction`, data);
  }

  @SubscribeMessage('tip')
  handleTip(
    @MessageBody() data: any,
    // @ConnectedSocket() client: any,
  ): void {
    this.server.emit(`channel-${data.channelId}-tip`, data);
  }

  @SubscribeMessage('stream')
  handleStream(
    @MessageBody() data: any,
    // @ConnectedSocket() client: any,
  ): void {
    startFFmpeg(data.url, data.signal);
  }

  @SubscribeMessage('stream-stop')
  handleStreamStop(
    @MessageBody() data: any,
    // @ConnectedSocket() client: any,
  ): void {
    this.server.emit(`channel-${data.channelId}-stream-stop`, data);
  }

  @SubscribeMessage('selfie')
  handleSelfie(
    @MessageBody() data: any,
    // @ConnectedSocket() client: any,
  ): void {
    this.server.emit(`channel-${data.channelId}-selfie`, data);
  }

  @SubscribeMessage('selfie-stop')
  handleSelfieStop(
    @MessageBody() data: any,
    // @ConnectedSocket() client: any,
  ): void {
    this.server.emit(`channel-${data.channelId}-selfie-stop`, data);
  }
}
