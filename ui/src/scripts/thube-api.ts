import type { Account, Channel, Paged, React, Stream, Tip, Video } from '@/types';
import axios from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:8080'
});

const ThubeAPI = {
    async createAccount(
        address: string,
        name: string,
        email: string,
        image: string | null
    ): Promise<Account | null> {
        try {
            const response = await client.post('/create-account', {
                address, name, email, image
            });

            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    async createChannel(
        address: string,
        name: string,
        image: string,
        cover: string | null
    ): Promise<Account | null> {
        try {
            const response = await client.post('/create-channel', {
                address, name, image, cover
            });

            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    async followAccount(
        address: string,
        streamer: string
    ): Promise<boolean> {
        try {
            const response = await client.post(`/follow-account/${address}`, streamer);
            return response.data;
        } catch (error) {
            console.error(error);
            return false;
        }
    },

    async unfollowAccount(
        address: string,
        streamer: string
    ): Promise<boolean> {
        try {
            const response = await client.post(`/unfollow-account/${address}`, streamer);
            return response.data;
        } catch (error) {
            console.error(error);
            return false;
        }
    },

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
            const response = await client.post('/create-stream', {
                streamId, address, name, thumbnail,
                exclusive, playback_uri, player_uri, tips, start_at
            });

            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    async joinStream(
        address: string,
        streamId: string
    ): Promise<boolean> {
        try {
            const response = await client.post(`/join-stream/${address}`, streamId);
            return response.data;
        } catch (error) {
            console.error(error);
            return false;
        }
    },

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
            const response = await client.post('/upload-video', {
                videoId, address, name, thumbnail,
                exclusive, playback_uri, tips
            });

            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    async watchVideo(
        address: string,
        videoId: string
    ): Promise<boolean> {
        try {
            const response = await client.post(`/watch-video/${address}`, videoId);
            return response.data;
        } catch (error) {
            console.error(error);
            return false;
        }
    },

    async getStreams(
        page: number,
        streamer: string | null
    ): Promise<Paged<Stream[]> | null> {
        try {
            const response = await client.get(`/streams?page=${page}&streamer=${streamer}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    async getStream(
        streamId: string
    ): Promise<Stream | null> {
        try {
            const response = await client.get(`/streams/${streamId}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    async startStream(streamId: string, txHash: string): Promise<boolean> {
        try {
            const response = await client.post(`/start-stream/${streamId}`, txHash);
            return response.data;
        } catch (error) {
            console.error(error);
            return false;
        }
    },

    async getVideos(
        page: number,
        streamer: string | null
    ): Promise<Paged<Video[]> | null> {
        try {
            const response = await client.get(`/videos?page=${page}&streamer=${streamer}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    async getVideo(
        streamId: string
    ): Promise<Video | null> {
        try {
            const response = await client.get(`/videos/${streamId}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    async getAccount(
        address: string
    ): Promise<Account | null> {
        try {
            const response = await client.get(`/accounts/${address}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    async getChannels(
        page: number,
    ): Promise<Channel[]> {
        try {
            const response = await client.get(`/channels?page=${page}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    },

    async getChannel(
        address: string
    ): Promise<Channel | null> {
        try {
            const response = await client.get(`/channels/${address}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
};

export default ThubeAPI;