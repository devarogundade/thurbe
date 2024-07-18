<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppHeader from '@/components/AppHeader.vue';
import SideBar from '@/components/SideBar.vue';
import ThurbeAPI from '@/scripts/thurbe-api';
import { onMounted, ref } from 'vue';
import { useWalletStore } from '@/stores/wallet';
import { WalletType } from '@/types';

const walletStore = useWalletStore();

// progress
const fetchingAccount = ref<boolean>(false);

const fetchAccount = async (address: string, walletType: WalletType) => {
    fetchingAccount.value = true;
    const account = await ThurbeAPI.getAccount(address);

    walletStore.setAddress(address);
    walletStore.setAccount(account);
    walletStore.setWalletType(walletType);

    fetchingAccount.value = false;
};

onMounted(() => {
    try {
        const address = localStorage.getItem('address');
        const walletType = localStorage.getItem('wallet-type');

        if (address && walletType && address != 'null' && walletType != 'null') {
            fetchAccount(address, walletType as unknown as WalletType);
        }
    } catch (error) {
        localStorage.clear();
    }
});
</script>

<template>
    <section>
        <div class="app_width">
            <AppHeader />
            <div class="app">
                <SideBar class="sidebar" />
                <div></div>
                <div class="sandbox">
                    <RouterView />
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.app {
    display: grid;
    width: 100%;
    grid-template-columns: 260px auto;
    height: 100vh;
}

.sandbox {
    border-right: 1px solid var(--bg-darkest);
    padding: 90px 0;
}
</style>