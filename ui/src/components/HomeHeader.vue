<script setup lang="ts">
import ThubeLogo from '@/components/icons/ThubeLogo.vue';
import DiscoverIcon from '@/components/icons/DiscoverIcon.vue';
import OutIcon from '@/components/icons/OutIcon.vue';
</script>

<template>
    <section>
        <div class="app_width">
            <header>
                <div class="logo">
                    <RouterLink to="/">
                        <ThubeLogo />
                    </RouterLink>
                </div>

                <div class="tabs">
                    <RouterLink to="/">Home</RouterLink>
                    <a href="https://devpost.com/software/thube" target="_blank">Docs
                        <OutIcon />
                    </a>
                    <a href="https://github.com/devarogundade/thurbe" target="_blank">GitHub
                        <OutIcon />
                    </a>
                </div>

                <RouterLink to="/">
                    <div class="connect">
                        <button>
                            <DiscoverIcon :color="'var(--tx-semi)'" />
                            <p>Skip Connect</p>
                        </button>
                    </div>
                </RouterLink>
            </header>
        </div>
    </section>
</template>

<style scoped>
section {
    position: sticky;
    top: 0;
    border-bottom: 1px solid var(--bg-darkest);
    background: var(--bg);
    z-index: 5;
}

.app_width {
    width: 1314px;
}

header {
    height: 90px;
    display: grid;
    grid-template-columns: 200px auto 200px;
    align-items: center;
}

.tabs {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 50px;
}

.tabs a {
    color: var(--tx-dimmed);
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 6px;
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

.connect {
    display: flex;
    justify-content: flex-end;
}

.connect button p {
    font-size: 14px;
    font-weight: 500;
    color: var(--tx-normal);
}
</style>