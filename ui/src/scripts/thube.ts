import { config } from './config';
import { abi as thubeAbi } from '../abis/thube';
import { waitForTransactionReceipt, writeContract } from '@wagmi/core';

export const thubeId: `0x${string}` = '0x';

export async function createStreamer(inclusiveCardBaseURI: string) {
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
};

export async function startInclusiveStream() {
    try {
        const result = await writeContract(config, {
            abi: thubeAbi,
            address: thubeId,
            functionName: 'startInclusiveStream'
        });

        const receipt = await waitForTransactionReceipt(config, { hash: result });

        return receipt.transactionHash;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export async function startExclusiveStream() {
    try {
        const result = await writeContract(config, {
            abi: thubeAbi,
            address: thubeId,
            functionName: 'startExclusiveStream'
        });

        const receipt = await waitForTransactionReceipt(config, { hash: result });

        return receipt.transactionHash;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export async function startTip(
    streamId: `0x${string}`,
    minTip: string,
    maxTip: string,
    targetAmount: string
) {
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
};

export async function pauseTip(
    streamId: `0x${string}`
) {
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
};

export async function resumeTip(
    streamId: `0x${string}`
) {
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
};

export async function endTip(
    streamId: `0x${string}`
) {
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
};

export async function donateStream(
    streamId: `0x${string}`,
    amount: string
) {
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
}; 