import type { Account, Channel, Paged, Stream, StreamType, Video, ViewerType } from '@/types';
import axios from 'axios';

const client = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
});

const ThurbeAPI = {
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
    ): Promise<Channel | null> {
        try {
            const channel: Channel = {
                owner: address,
                name,
                image,
                cover,
                created_at: new Date()
            };
            const response = await client.post('/create-channel', channel);

            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    async followAccount(
        streamer: string,
        viewer: string
    ): Promise<boolean> {
        try {
            const response = await client.post(`/follow-account/${streamer}/${viewer}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return false;
        }
    },

    async unfollowAccount(
        streamer: string,
        viewer: string
    ): Promise<boolean> {
        try {
            const response = await client.post(`/unfollow-account/${streamer}/${viewer}`);
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
        description: string | null,
        thetaId: string | null,
        thumbnail: string,
        viewerType: ViewerType,
        streamType: StreamType,
        tips: boolean,
        start_at: Date
    ): Promise<Stream | null> {
        try {
            const stream: Stream = {
                streamId,
                streamer: address,
                name, description,
                thumbnail,
                thetaId,
                viewerType,
                tips,
                start_at,
                stream_server: null,
                stream_key: null,
                viewers: [],
                likes: [],
                created_at: new Date(),
                dislikes: [],
                streamType,
                live: false
            };
            const response = await client.post('/create-stream', stream);

            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    async endStream(streamId: string): Promise<boolean> {
        try {
            const response = await client.post(`/end-stream/${streamId}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return false;
        }
    },

    async joinStream(
        viewer: string,
        streamId: string
    ): Promise<boolean> {
        try {
            const response = await client.post(`/join-stream/${viewer}/${streamId}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return false;
        }
    },

    async likeStream(
        viewer: string,
        streamId: string
    ): Promise<boolean> {
        try {
            const response = await client.post(`/like-stream/${viewer}/${streamId}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return false;
        }
    },

    async likeVideo(
        viewer: string,
        videoId: string
    ): Promise<boolean> {
        try {
            const response = await client.post(`/like-video/${viewer}/${videoId}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return false;
        }
    },

    async dislikeStream(
        viewer: string,
        streamId: string
    ): Promise<boolean> {
        try {
            const response = await client.post(`/dislike-stream/${viewer}/${streamId}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return false;
        }
    },

    async dislikeVideo(
        viewer: string,
        videoId: string
    ): Promise<boolean> {
        try {
            const response = await client.post(`/dislike-video/${viewer}/${videoId}`);
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
        description: string | null,
        thumbnail: string,
        viewerType: ViewerType,
        thetaId: string | null,
        tips: boolean,
    ): Promise<Video | null> {
        try {
            const payload: Video = {
                videoId,
                streamer: address,
                name,
                description,
                thumbnail,
                viewerType,
                thetaId,
                tips,
                viewers: [],
                views: 0,
                created_at: new Date(),
                likes: [],
                dislikes: []
            };

            const response = await client.post('/upload-video', payload);

            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    async watchVideo(
        viewer: string,
        videoId: string
    ): Promise<boolean> {
        try {
            const response = await client.post(`/watch-video/${viewer}/${videoId}`);
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

    async startStream(streamId: string, streamServer: string, streamKey: string): Promise<boolean> {
        try {
            const response = await client.post(`/start-stream/${streamId}?streamServer=${streamServer}&streamKey=${streamKey}`);
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
    ): Promise<Paged<Channel[]> | null> {
        try {
            const response = await client.get(`/channels?page=${page}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
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

export default ThurbeAPI;