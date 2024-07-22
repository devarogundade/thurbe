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
import RtmpClient from "../rtmp-client";

@WebSocketGateway({ cors: true })
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

  @SubscribeMessage('chat')
  handleChat(
    @MessageBody() data: any,
    // @ConnectedSocket() client: any,
  ): void {
    this.server.emit(`channel-${data.channelId}-chat`, data);
  }

  @SubscribeMessage('reaction')
  handleReaction(
    @MessageBody() data: any,
    // @ConnectedSocket() client: any,
  ): void {
    this.server.emit(`channel-${data.channelId}-reaction`, data);
  }

  @SubscribeMessage('stream')
  handleStreamVideo(
    @MessageBody() data: any,
    // @ConnectedSocket() client: any,
  ): void {
    const rtmpClient = new RtmpClient(data.url);
    rtmpClient.writeStream(data.stream);
  }

  @SubscribeMessage('stream-stop')
  handleStreamStop(
    @MessageBody() data: any,
    // @ConnectedSocket() client: any,
  ): void {
    this.server.emit(`channel-${data.channelId}-stream-stop`, data);
  }
}
