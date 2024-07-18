import { config } from './config';
import { abi as thubeAbi } from '../abis/thurbe';
import { waitForTransactionReceipt, writeContract } from '@wagmi/core';

export const thubeId: `0x${string}` = '0x';

const Contract = {
    async createStreamer(inclusiveCardBaseURI: string): Promise<`0x${string}` | null> {
        try {
            const result = await writeContract(config, {
                abi: thubeAbi,
                address: thubeId,
                functionName: 'createStreamer',
                args: [inclusiveCardBaseURI]
            });

            const receipt = await waitForTransactionReceipt(config, { hash: result });

            return receipt.transactionHash;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async startInclusiveStream(streamId: `0x${string}`): Promise<`0x${string}` | null> {
        try {
            const result = await writeContract(config, {
                abi: thubeAbi,
                address: thubeId,
                functionName: 'startInclusiveStream',
                args: [streamId]
            });

            const receipt = await waitForTransactionReceipt(config, { hash: result });

            return receipt.transactionHash;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async startExclusiveStream(streamId: `0x${string}`): Promise<`0x${string}` | null> {
        try {
            const result = await writeContract(config, {
                abi: thubeAbi,
                address: thubeId,
                functionName: 'startExclusiveStream',
                args: [streamId]
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

    async startTip(
        streamId: `0x${string}`,
        minTip: string,
        maxTip: string,
        targetAmount: string
    ): Promise<`0x${string}` | null> {
        try {
            const result = await writeContract(config, {
                abi: thubeAbi,
                address: thubeId,
                functionName: 'startTip',
                args: [streamId, minTip, maxTip, targetAmount]
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

    async resumeTip(
        streamId: `0x${string}`
    ): Promise<`0x${string}` | null> {
        try {
            const result = await writeContract(config, {
                abi: thubeAbi,
                address: thubeId,
                functionName: 'resumeTip',
                args: [streamId]
            });

            const receipt = await waitForTransactionReceipt(config, { hash: result });

            return receipt.transactionHash;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async endTip(
        streamId: `0x${string}`
    ): Promise<`0x${string}` | null> {
        try {
            const result = await writeContract(config, {
                abi: thubeAbi,
                address: thubeId,
                functionName: 'endTip',
                args: [streamId]
            });

            const receipt = await waitForTransactionReceipt(config, { hash: result });

            return receipt.transactionHash;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async donateStream(
        streamId: `0x${string}`,
        amount: string
    ): Promise<`0x${string}` | null> {
        try {
            const result = await writeContract(config, {
                abi: thubeAbi,
                address: thubeId,
                functionName: 'donateStream',
                args: [streamId],
                value: BigInt(amount)
            });

            const receipt = await waitForTransactionReceipt(config, { hash: result });

            return receipt.transactionHash;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
};

export default Contract;

