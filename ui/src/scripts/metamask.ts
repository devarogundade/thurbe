const Metamask = {
    async open(callback: (address: string) => void, onError?: (message: string) => void) {
        // @ts-ignore
        if (typeof ethereum === 'undefined') {
            if (onError) onError('Install metamask');
            return null;
        }

        try {
            // @ts-ignore
            const accounts = await ethereum.request({
                method: 'eth_requestAccounts', params: []
            });

            if (accounts.length > 0) {
                callback(accounts[0]);
            }

            await this.switchToThetaTestnet();
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    switchToThetaTestnet: async function () {
        try {
            // @ts-ignore
            await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x16d' }],
            });
        } catch (error: any) {
            if (error.code === 4902) {
                try {
                    // @ts-ignore
                    await ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: '0x16d',
                            chainName: 'Theta Testnet',
                            nativeCurrency: {
                                name: 'TFUEL',
                                symbol: 'TFUEL',
                                decimals: 18
                            },
                            blockExplorerUrls: ['https://explorer.thetatoken.org'],
                            rpcUrls: ['https://eth-rpc-api-testnet.thetatoken.org/rpc'],
                        },],
                    });
                } catch (error2) {
                    console.log(error2);
                }
            }
        }
    },

    addToMetamask: async function (address: string, symbol: string, image: string) {
        try {
            // @ts-ignore
            await ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20',
                    options: {
                        address,
                        symbol,
                        decimals: '18',
                        image
                    },
                },
            });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
};

export default Metamask;