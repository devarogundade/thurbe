import { config } from './config';
import type { Token } from './../types';
import { waitForTransactionReceipt, getBalance, writeContract, readContract } from '@wagmi/core';
import { erc20Abi } from 'viem';

export async function getAllowance(tokenId: `0x${string}`, address: `0x${string}`, spender: `0x${string}`) {
    try {
        return await readContract(config, {
            abi: erc20Abi,
            address: tokenId,
            functionName: 'allowance',
            args: [address, spender]
        });
    } catch (error) {
        console.log(error);

        return 0;
    }
}

export async function approve(tokenId: `0x${string}`, spender: `0x${string}`, amount: string) {
    try {
        const result = await writeContract(config, {
            abi: erc20Abi,
            address: tokenId,
            functionName: 'approve',
            args: [spender, BigInt(amount)]
        });

        const receipt = await waitForTransactionReceipt(config, { hash: result });

        return receipt.transactionHash;
    } catch (error) {
        console.log(error);

        return null;
    }
}

export async function getTokenBalance(tokenId: `0x${string}`, address: `0x${string}`) {
    try {
        const { value } = await getBalance(config, { token: tokenId, address });
        return value;
    } catch (error) {
        console.log(error);

        return BigInt(0);
    }
}

export async function addToWallet(token: Token) {
    try {
        // @ts-ignore
        await ethereum.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC20',
                options: {
                    address: token.tokenId,
                    symbol: token.symbol,
                    decimals: '18',
                    image: 'https://thube.xyz/images/' + token.image + '.png',
                },
            },
        });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}