<script setup lang="ts">
import ThubeLogo from '@/components/icons/ThubeLogo.vue';
import WalletIcon from '@/components/icons/WalletIcon.vue';
</script>

<template>
    <section>
        <div class="app_width">
            <header>
                <div class="logo"></div>

                <div class="tabs">
                    <RouterLink to="/">Home</RouterLink>
                    <a href="/" target="_blank">Docs</a>
                    <a href="/" target="_blank">Blog</a>
                </div>

                <div class="connect">
                    <button>
                        <WalletIcon />
                        <p>Connect Wallet</p>
                    </button>
                </div>
            </header>
        </div>
    </section>
</template>

<style scoped>
section {
    position: fixed;
    top: 0;
    border-bottom: 1px solid var(--bg-darkest);
    z-index: 5;
}

header {
    height: 90px;
    display: grid;
    grid-template-columns: 200px auto 200px;
    align-items: center;
    background: var(--bg);
}

.tabs {
    display: flex;
    align-items: center;
    gap: 50px;
    padding: 0 100px;
}

.tabs a {
    color: var(--tx-dimmed);
    font-size: 14px;
    font-weight: 500;
}

.tabs a:hover {
    color: var(--tx-normal);
}

.connect button {
    background: var(--bg);
    border: 1px solid var(--bg-darkest);
    width: 185px;
    height: 40px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    user-select: none;
    cursor: pointer;
}

.connect button p {
    font-size: 14px;
    font-weight: 500;
    color: var(--tx-normal);
}
</style>