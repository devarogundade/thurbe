import { walletConnect } from '@wagmi/connectors';
import { defaultWagmiConfig } from '@web3modal/wagmi';
import { thetaTestnet } from './theta';

const metadata = {
    name: 'Thurbe',
    description: 'Thurbe',
    url: 'https://thurbe.xyz',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
};

export const chains = [thetaTestnet];

export const config = defaultWagmiConfig({
    // @ts-ignore
    chains, projectId: import.meta.env.VITE_PROJECT_ID, metadata, connectors: [walletConnect({
        projectId: import.meta.env.VITE_PROJECT_ID
    })]
});