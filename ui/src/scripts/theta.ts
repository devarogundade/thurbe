import { defineChain } from "viem";

export const thetaTestnet = defineChain({
    id: 365,
    name: 'Theta Testnet',
    network: 'theta-testnet',
    nativeCurrency: {
        name: 'TFUEL',
        symbol: 'TFUEL',
        decimals: 18,
    },
    rpcUrls: {
        default: { http: ['https://eth-rpc-api-testnet.thetatoken.org/rpc'] },
    },
    blockExplorers: {
        default: {
            name: 'ThetaScan Testnet',
            url: 'https://testnet-explorer.thetatoken.org'
        },
    },
    testnet: false,
});
