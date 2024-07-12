import type { Account, Paged, React, Stream, Tip, Video } from '@/types';
import axios from 'axios';
import type { SocketApi } from './socket-api';

const ThubeApi = axios.create({
    baseURL: 'https://api.thetavideoapi.com'
});

export async function createAccount(
    address: string,
    name: string,
    email: string,
    image: string | null
): Promise<Account | null> {
    try {
        const response = await ThubeApi.post('/create-account', {
            address, name, email, image
        });

        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function followAccount(
    address: string,
    streamer: string
): Promise<boolean> {
    try {
        const response = await ThubeApi.post(`/follow-account/${address}`, streamer);
        return response.data;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function unfollowAccount(
    address: string,
    streamer: string
): Promise<boolean> {
    try {
        const response = await ThubeApi.post(`/unfollow-account/${address}`, streamer);
        return response.data;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function startStream(
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
        const response = await ThubeApi.post('/start-stream', {
            streamId, address, name, thumbnail,
            collection, playback_uri, player_uri, tips, start_at
        });

        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function joinStream(
    address: string,
    streamId: string
): Promise<boolean> {
    try {
        const response = await ThubeApi.post(`/join-stream/${address}`, streamId);
        return response.data;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function uploadVideo(
    videoId: string,
    address: string,
    name: string,
    thumbnail: string,
    collection: string,
    playback_uri: string | null,
    tips: boolean,
): Promise<Video | null> {
    try {
        const response = await ThubeApi.post('/upload-video', {
            videoId, address, name, thumbnail,
            collection, playback_uri, tips
        });

        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function watchVideo(
    address: string,
    videoId: string
): Promise<boolean> {
    try {
        const response = await ThubeApi.post(`/watch-video/${address}`, videoId);
        return response.data;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function getStreams(
    page: number,
    streamer: string | null
): Promise<Paged<Stream[]> | null> {
    try {
        const response = await ThubeApi.get(`/streams?page=${page}&streamer=${streamer}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getStream(
    streamId: string
): Promise<Stream | null> {
    try {
        const response = await ThubeApi.get(`/streams/${streamId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getVideos(
    page: number,
    streamer: string | null
): Promise<Paged<Video[]> | null> {
    try {
        const response = await ThubeApi.get(`/videos?page=${page}&streamer=${streamer}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getVideo(
    streamId: string
): Promise<Video | null> {
    try {
        const response = await ThubeApi.get(`/videos/${streamId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getAccount(
    address: string
): Promise<Account | null> {
    try {
        const response = await ThubeApi.get(`/accounts/${address}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export function sendReaction(
    api: SocketApi,
    react: React
): void {
    api.emit('reaction', react);
}

export function sendTip(
    api: SocketApi,
    tip: Tip
): void {
    api.emit('tip', tip);
}

export function sendSelfie(
    api: SocketApi,
    channelId: string,
    stream: any
): void {
    api.emit('selfie', { channelId, stream });
}