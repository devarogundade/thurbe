import { config } from './config';
import { abi as thubeAbi } from '../abis/thurbe';
import { waitForTransactionReceipt, writeContract } from '@wagmi/core';

export const thubeId: `0x${string}` = '0x';

const Contract = {
    // === Streamer Functions ===
    async createStreamer(cardBaseURI: string): Promise<`0x${string}` | null> {
        try {
            const result = await writeContract(config, {
                abi: thubeAbi,
                address: thubeId,
                functionName: 'create',
                args: [cardBaseURI]
            });

            const receipt = await waitForTransactionReceipt(config, { hash: result });

            return receipt.transactionHash;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async createExclusiveCard(
        name: string,
        symbol: string,
        mintPrice: string,
        baseURI: string
    ): Promise<`0x${string}` | null> {
        try {
            const result = await writeContract(config, {
                abi: thubeAbi,
                address: thubeId,
                functionName: 'createExclusiveCard',
                args: [name, symbol, mintPrice, baseURI]
            });

            const receipt = await waitForTransactionReceipt(config, { hash: result });

            return receipt.transactionHash;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async startStream(streamId: `0x${string}`, exclusive: boolean, tips: boolean): Promise<`0x${string}` | null> {
        try {
            const result = await writeContract(config, {
                abi: thubeAbi,
                address: thubeId,
                functionName: 'startStream',
                args: [streamId, exclusive, tips]
            });

            const receipt = await waitForTransactionReceipt(config, { hash: result });

            return receipt.transactionHash;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async uploadVideo(videoId: `0x${string}`, exclusive: boolean, tips: boolean): Promise<`0x${string}` | null> {
        try {
            const result = await writeContract(config, {
                abi: thubeAbi,
                address: thubeId,
                functionName: 'uploadVideo',
                args: [videoId, exclusive, tips]
            });

            const receipt = await waitForTransactionReceipt(config, { hash: result });

            return receipt.transactionHash;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async endStream(streamId: `0x${string}`): Promise<`0x${string}` | null> {
        try {
            const result = await writeContract(config, {
                abi: thubeAbi,
                address: thubeId,
                functionName: 'endStream',
                args: [streamId]
            });

            const receipt = await waitForTransactionReceipt(config, { hash: result });

            return receipt.transactionHash;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async pauseTip(
        streamId: `0x${string}`
    ): Promise<`0x${string}` | null> {
        try {
            const result = await writeContract(config, {
                abi: thubeAbi,
                address: thubeId,
                functionName: 'pauseTip',
                args: [streamId]
            });

            const receipt = await waitForTransactionReceipt(config, { hash: result });

            return receipt.transactionHash;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    // === Viewers Functions ===
    async tipStream(
        streamId: `0x${string}`,
        amount: string
    ): Promise<`0x${string}` | null> {
        try {
            const result = await writeContract(config, {
                abi: thubeAbi,
                address: thubeId,
                functionName: 'tipStream',
                args: [streamId, BigInt(amount)],
            });

            const receipt = await waitForTransactionReceipt(config, { hash: result });

            return receipt.transactionHash;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async tipVideo(
        videoId: `0x${string}`,
        amount: string
    ): Promise<`0x${string}` | null> {
        try {
            const result = await writeContract(config, {
                abi: thubeAbi,
                address: thubeId,
                functionName: 'tipVideo',
                args: [videoId, BigInt(amount)],
            });

            const receipt = await waitForTransactionReceipt(config, { hash: result });

            return receipt.transactionHash;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async mintCard(
        streamer: `0x${string}`,
        to: `0x${string}`,
        exclusive: boolean
    ): Promise<`0x${string}` | null> {
        try {
            const result = await writeContract(config, {
                abi: thubeAbi,
                address: thubeId,
                functionName: 'mintCard',
                args: [streamer, to, exclusive],
            });

            const receipt = await waitForTransactionReceipt(config, { hash: result });

            return receipt.transactionHash;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    newVideoId(): `0x${string}` {
        return `0x${'ab'}`;
    },

    newStreamId(): `0x${string}` {
        return `0x${'ab'}`;
    }
};

export default Contract;

