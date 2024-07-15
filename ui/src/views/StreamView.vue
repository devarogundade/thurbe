<script setup lang="ts">
import Peer from 'simple-peer';
import Media from '@/scripts/media';
import ThetaAPI from '@/scripts/theta-api';
import SocketAPI from '@/scripts/socket-api';
import ThubeAPI from '@/scripts/thube-api';
import Contract from '@/scripts/contract';
import type { CreatedStream, StartedStream } from '@/types';
import { notify } from '@/reactives/notify';

let steam: MediaStream | null;
const socketAPI = new SocketAPI(
    import.meta.env.VITE_BACKEND_URL
);

const endLivestream = async (streamId: `0x${string}`) => {
    try {
        // Interact with smart-contracts
        const txHash: `0x${string}` | null = await Contract.endStream(streamId);
        if (!txHash) { throw new Error(""); }

        if (!steam) { throw new Error(""); }
        await Media.closeStream(steam);

        const data = JSON.stringify({ streamId });

        socketAPI.emit('stream-stop', data);
    } catch (error) {

    }
};

const initLiveStream = async (streamId: `0x${string}`, description: string) => {
    try {
        // Interact with smart-contracts
        const txHash: `0x${string}` | null = await Contract.startInclusiveStream(streamId);
        if (!txHash) { throw new Error(""); }

        // Interact with theta video api
        const createdStream: CreatedStream | null = await ThetaAPI.createStream(
            description
        );
        if (!createdStream) { throw new Error(""); }

        const startedStream: StartedStream | null = await ThetaAPI.startStream(
            createdStream.id
        );
        if (!startedStream) { throw new Error(""); }

        // Interact with device media
        steam = await Media.screenShare();
        if (!steam) { throw new Error(""); }

        const peer = new Peer({ initiator: true, stream: steam, trickle: false });

        peer.on('signal', (data: any) => {
            console.log('SIGNAL', JSON.stringify(data));

            // Send this data to your media server that converts WebRTC to RTMP
            const signalData = JSON.stringify({
                url: `${startedStream.stream_server}/${startedStream.stream_key}`,
                signal: data
            });

            socketAPI.emit('stream', signalData);
        });

        peer.on('connect', () => {
            notify.push({
                title: 'Successfully started livestream.',
                description: 'We have informed your subscribers.',
                category: 'success'
            });

            ThubeAPI.startStream(streamId, txHash);
        });

        peer.on('error', (error: any) => {
            notify.push({
                title: 'An error occured.',
                description: error.message || 'Unkwown cause.',
                category: 'error'
            });
        });
    } catch (error: any) {
        notify.push({
            title: 'Failed to start livestream.',
            description: error.message || 'Unkwown cause.',
            category: 'error'
        });
    }
}

</script>

<template>

</template>

<style scoped></style>