import { config } from './config';
import { abi as thurbeAbi, cardAbi } from '../abis/thurbe';
import { readContract, waitForTransactionReceipt, writeContract } from '@wagmi/core';

export const thurbeId: `0x${string}` = '0xB228793E1C1CBF71FbBccc55adAD4E1486c8762B';
export const thurbeTokenId: `0x${string}` = '0xA8EE5d96C6005BA0Db924bf0518b1F4564428e55';

const Contract = {
    // === Streamer Functions ===
    async createStreamer(cardBaseURI: string,
        name: string,
        symbol: string,
        mintPrice: string,
        cardExlusiveBaseURI: string): Promise<`0x${string}` | null> {
        try {
            const result = await writeContract(config, {
                abi: thurbeAbi,
                address: thurbeId,
                functionName: 'create',
                args: [cardBaseURI, name, symbol, mintPrice, cardExlusiveBaseURI]
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
                abi: thurbeAbi,
                address: thurbeId,
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
                abi: thurbeAbi,
                address: thurbeId,
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
                abi: thurbeAbi,
                address: thurbeId,
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
                abi: thurbeAbi,
                address: thurbeId,
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
                abi: thurbeAbi,
                address: thurbeId,
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
                abi: thurbeAbi,
                address: thurbeId,
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
        exclusive: boolean,
        value: bigint
    ): Promise<`0x${string}` | null> {
        try {
            const result = await writeContract(config, {
                abi: thurbeAbi,
                address: thurbeId,
                functionName: 'mintCard',
                args: [streamer, to, exclusive],
                value
            });

            const receipt = await waitForTransactionReceipt(config, { hash: result });

            return receipt.transactionHash;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async getCardId(
        streamer: `0x${string}`,
        exclusive: boolean
    ): Promise<`0x${string}` | null> {
        try {
            return await readContract(config, {
                abi: thurbeAbi,
                address: thurbeId,
                functionName: 'getCardId',
                args: [streamer, exclusive],
            }) as `0x${string}`;
        } catch (error) {

            console.log(error);
            return null;
        }
    },

    async getMintPrice(
        cardId: `0x${string}`,
    ): Promise<bigint> {
        try {
            // @ts-ignore
            return await readContract(config, {
                abi: cardAbi,
                address: cardId,
                functionName: 'getMintPrice'
            });
        } catch (error) {
            console.log(error);
            return BigInt(0);
        }
    },

    newId(): `0x${string}` {
        const array = new Uint8Array(32);
        window.crypto.getRandomValues(array);
        return `0x${Array.from(array).map(byte => byte.toString(16).padStart(2, '0')).join('')}`;
    }
};

export default Contract;

