import { walletConnect } from '@wagmi/connectors';
import { defaultWagmiConfig } from '@web3modal/wagmi';
import { thetaTestnet } from './theta';

const metadata = {
    name: 'zkStream',
    description: 'zkStream',
    url: 'https://zkstream.xyz',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
};

export const chains = [thetaTestnet];

export const config = defaultWagmiConfig({
    // @ts-ignore
    chains, projectId: import.meta.env.VITE_PROJECT_ID, metadata, connectors: [walletConnect({
        projectId: import.meta.env.VITE_PROJECT_ID
    })]
});