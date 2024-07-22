<script setup lang="ts">
import PortfolioHeader from '@/components/PortfolioHeader.vue';
import AirdropIcon from '@/components/icons/AirdropIcon.vue';
import { useWalletStore } from '@/stores/wallet';

const walletStore = useWalletStore();
</script>

<template>
    <main v-if="!walletStore.address || !walletStore.account">
        <div class="no_channel_container">
            <div class="no_channel">
                <AirdropIcon :color="'var(--tx-normal)'" />
                <h3>You are not connected</h3>
                <p>You have to signin with your Web3 wallet.</p>
                <RouterLink to="/signin">
                    <button>Connect Wallet</button>
                </RouterLink>
            </div>
        </div>
    </main>

    <main v-if="walletStore.account && walletStore.account.channel">
        <PortfolioHeader />
        <RouterView />
    </main>

    <main v-if="walletStore.account && !walletStore.account.channel">
        <div class="no_channel_container">
            <div class="no_channel">
                <AirdropIcon :color="'var(--tx-normal)'" />
                <h3>You don't own a Channel</h3>
                <p>Creating your own channel allows you to upload videos and create livestream, and also monetize your
                    contents.</p>
                <RouterLink to="/portfolio/settings">
                    <button>Create Channel</button>
                </RouterLink>
            </div>
        </div>
    </main>
</template>

<style scoped>
.no_channel_container {
    display: flex;
    margin-top: 60px;
    justify-content: center;
}

.no_channel {
    display: flex;
    width: 450px;
    text-align: center;
    align-items: center;
    flex-direction: column;
}

.no_channel svg {
    width: 40px;
    height: 40px;
}

.no_channel h3 {
    margin-top: 20px;
    font-size: 20px;
    font-weight: 600;
    color: var(--tx-normal);
}

.no_channel p {
    font-size: 16px;
    font-weight: 500;
    color: var(--tx-dimmed);
    margin-top: 10px;
}

.no_channel button {
    margin-top: 40px;
    width: 165px;
    height: 40px;
    gap: 12px;
    border-radius: 6px;
    background: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    color: var(--bg);
}
</style>