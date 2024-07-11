import type { Account, Paged, Stream } from '@/types';
import axios from 'axios';

const zkStreamApi = axios.create({
    baseURL: 'https://api.thetavideoapi.com'
});

export async function createAccount(
    address: string,
    name: string,
    email: string,
    image: string | null
): Promise<Account | null> {
    try {
        const response = await zkStreamApi.post('/create-account', {
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
        const response = await zkStreamApi.post(`/follow-account/${address}`, streamer);
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
        const response = await zkStreamApi.post(`/unfollow-account/${address}`, streamer);
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
        const response = await zkStreamApi.post('/start-stream', {
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
        const response = await zkStreamApi.post(`/join-stream/${address}`, streamId);
        return response.data;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function getStreams(
    page: number,
    creator: string | null
): Promise<Paged<Stream[]> | null> {
    try {
        const response = await zkStreamApi.get(`/streams?page=${page}&creator=${creator}`);
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
        const response = await zkStreamApi.get(`/streams/${streamId}`);
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
        const response = await zkStreamApi.get(`/accounts/${address}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}