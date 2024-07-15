<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppHeader from '@/components/AppHeader.vue';
import SideBar from '@/components/SideBar.vue';
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