<script setup lang="ts">
import { useRoute } from 'vue-router';
import ThubeLogo from '@/components/icons/ThubeLogo.vue';
import DiscoverIcon from '@/components/icons/DiscoverIcon.vue';
import AirdropIcon from '@/components/icons/AirdropIcon.vue';
import MediumIcon from '@/components/icons/MediumIcon.vue';
import TwitterIcon from '@/components/icons/TwitterIcon.vue';
import DiscordIcon from '@/components/icons/DiscordIcon.vue';
import TelegramIcon from '@/components/icons/TelegramIcon.vue';

const route = useRoute();
</script>

<template>
    <main>
        <div class="logo">
            <RouterLink to="/">
                <ThubeLogo />
            </RouterLink>
        </div>
        <div class="overflow">
            <div class="tab_items">
                <div class="tab_parent">
                    <RouterLink to="/">
                        <div class="title">
                            <DiscoverIcon :active="(route.name as string)?.startsWith('explore')" />
                            <h3>Explore</h3>
                            <div
                                :class="(route.name as string)?.startsWith('explore') ? 'indicator indicator_active' : 'indicator'">
                            </div>
                        </div>
                    </RouterLink>
                    <div class="tabs">
                        <RouterLink to="/">
                            <div
                                :class="(route.name as string)?.startsWith('explore-videos') ? 'tab tab_active' : 'tab'">
                                Videos
                            </div>
                        </RouterLink>
                        <RouterLink to="/streams">
                            <div
                                :class="(route.name as string)?.startsWith('explore-streams') ? 'tab tab_active' : 'tab'">
                                Streams
                            </div>
                        </RouterLink>
                        <RouterLink to="/channels">
                            <div
                                :class="(route.name as string)?.startsWith('explore-channels') ? 'tab tab_active' : 'tab'">
                                Channels
                            </div>
                        </RouterLink>
                    </div>
                </div>
                <div class="tab_parent">
                    <RouterLink to="/portfolio">
                        <div class="title">
                            <AirdropIcon :active="(route.name as string)?.startsWith('portfolio')" />
                            <h3>My Channel</h3>
                            <div
                                :class="(route.name as string)?.startsWith('portfolio') ? 'indicator indicator_active' : 'indicator'">
                            </div>
                        </div>
                    </RouterLink>
                    <div class="tabs">
                        <RouterLink to="/portfolio">
                            <div
                                :class="(route.name as string)?.startsWith('portfolio-videos') ? 'tab tab_active' : 'tab'">
                                Videos
                            </div>
                        </RouterLink>
                        <RouterLink to="/portfolio/streams">
                            <div
                                :class="(route.name as string)?.startsWith('portfolio-streams') ? 'tab tab_active' : 'tab'">
                                Streams
                            </div>
                        </RouterLink>
                        <RouterLink to="/portfolio/revenue">
                            <div
                                :class="(route.name as string)?.startsWith('portfolio-revenue') ? 'tab tab_active' : 'tab'">
                                Revenue
                            </div>
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
        <div class="links">
            <div class="socials">
                <a href="#">
                    <MediumIcon class="social_icon" />
                </a>
                <a href="#">
                    <TwitterIcon class="social_icon" />
                </a>
                <a href="#">
                    <DiscordIcon class="social_icon" />
                </a>
                <a href="#">
                    <TelegramIcon class="social_icon" />
                </a>
            </div>
        </div>
    </main>
</template>

<style scoped>
main {
    height: 100vh;
    top: 0;
    width: 260px;
    border-right: 1px solid var(--bg-darkest);
    border-left: 1px solid var(--bg-darkest);
    position: fixed;
    z-index: 20;
}

.logo {
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.logo img {
    width: 109px;
    height: 30px;
}

.overflow {
    height: 70vh;
    overflow-y: auto;
}

.overflow:hover::-webkit-scrollbar {
    display: block;
}

.overflow::-webkit-scrollbar {
    display: none;
    width: 3px;
}

.tab_items {
    display: flex;
    margin-top: 60px;
    flex-direction: column;
    gap: 36px;
    align-items: flex-end;
    padding-bottom: 10px;
}

.tab_parent {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.title {
    width: 220px;
    height: 50px;
    display: flex;
    align-items: center;
    position: relative;
    padding: 0 30px;
    gap: 20px;
}

.title h3 {
    font-weight: 500;
    font-size: 16px;
    line-height: 120%;
    color: var(--tx-normal);
}

.title span {
    padding: 4px 8px;
    font-size: 10px;
    margin-left: 12px;
    color: var(--tx-dimmed);
    height: 20px;
    background: var(--primary-light);
    border-radius: 2px;
}

.indicator {
    position: absolute;
    width: 4px;
    height: 42px;
    right: 0;
    top: 4px;
    border-radius: 3px 0px 0px 3px;
    background: var(--bg-darkest);
}

.indicator_active {
    background: var(--primary-light);
}

.tabs {
    width: 180px;
    border-left: 2px var(--bg-darkest) solid;
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.tab {
    height: 40px;
    font-weight: 500;
    font-size: 16px;
    display: flex;
    align-items: center;
    padding: 0 40px;
    color: var(--tx-dimmed);
}

.tab_active {
    color: var(--tx-normal);
}

.links {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 30px 40px;
    background: var(--bg);
}

.support {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
    text-decoration: none;
}

.support h3 {
    font-weight: 500;
    font-size: 16px;
    color: var(--tx-normal);
}

.socials {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.social_icon {
    width: 26px;
    height: 26px;
}
</style>