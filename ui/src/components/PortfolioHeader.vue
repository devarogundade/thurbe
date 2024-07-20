<script setup lang="ts">
import UserFullIcon from '@/components/icons/UserFullIcon.vue';
import Settings2Icon from '@/components/icons/Settings2Icon.vue';
import ThreeDotsIcon from '@/components/icons/ThreeDotsIcon.vue';
import ExportIcon from '@/components/icons/ExportIcon.vue';
import WifiIcon from '@/components/icons/WifiIcon.vue';
import CoinIcon from '@/components/icons/CoinIcon.vue';
import GoLiveOption from '@/views/pops/GoLiveOption.vue';

import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
    <div class="portfolio_container">
        <div class="portfolio_header">
            <img src="/images/game.png" alt="" class="portfolio_header_cover">
            <div class="portfolio_header_content">
                <div class="portfolio_name">
                    <img src="/images/game.png" alt="">
                    <div class="portfolio_name_text">
                        <h3>The CartoonistGuy</h3>
                        <div class="portfolio_name_follows">
                            <UserFullIcon />
                            <p><span>24,478</span> Followers</p>
                        </div>
                        <p class="joined">Joined November 2023</p>
                    </div>
                </div>

                <div class="portfolio_follows">
                    <button class="settings_btn">
                        <Settings2Icon /> Settings
                    </button>

                    <button class="menu_btn">
                        <ThreeDotsIcon />
                    </button>
                </div>
            </div>
        </div>

        <div class="toolbar">
            <div class="tab_items">
                <RouterLink :to="`/portfolio`">
                    <div :class="route.name == 'portfolio-videos' ? 'tab tab_active' : 'tab'">
                        <p>Videos</p>
                    </div>
                </RouterLink>
                <RouterLink :to="`/portfolio/streams`">
                    <div :class="route.name == 'portfolio-streams' ? 'tab tab_active' : 'tab'">
                        <p>Streams</p>
                    </div>
                </RouterLink>
                <RouterLink :to="`/portfolio/revenue`">
                    <div :class="route.name == 'portfolio-revenue' ? 'tab tab_active' : 'tab'">
                        <p>Revenue</p>
                    </div>
                </RouterLink>
            </div>
            <div class="filter_items">
                <RouterLink to="/create" v-if="route.name == 'portfolio-videos'">
                    <div class="filter">
                        <ExportIcon />
                        <p>Upload</p>
                    </div>
                </RouterLink>

                <RouterLink to="/create/stream" v-if="route.name == 'portfolio-streams'">
                    <div class="filter">
                        <WifiIcon />
                        <p>Go Live</p>
                    </div>
                </RouterLink>

                <div class="filter" v-if="route.name == 'portfolio-revenue'">
                    <CoinIcon />
                    <p>Claim All</p>
                </div>
            </div>
        </div>

        <GoLiveOption :account="{}" />
    </div>
</template>

<style scoped>
.portfolio_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    top: -343px;
    /* -2px */
    position: sticky;
    z-index: 2;
}

.portfolio_header {
    width: 1020px;
    max-width: 100%;
}

.portfolio_header_cover {
    width: 100%;
    height: 240px;
    object-fit: cover;
    border-radius: 0px 0px 10px 10px;
}

.portfolio_header_content {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.portfolio_name {
    display: flex;
    align-items: center;
    gap: 40px;
}

.portfolio_name img {
    width: 140px;
    height: 140px;
    object-fit: cover;
    border-radius: 8px;
    border: 3px solid var(--bg-dark);
    margin-top: -30px;
    margin-left: 40px;
}

.portfolio_name h3 {
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    color: var(--tx-normal);
    margin-top: 12px;
}

.portfolio_name_follows {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 12px;
}

.portfolio_name_follows p {
    font-size: 14px;
    font-weight: 500;
    margin-top: 2px;
    color: var(--tx-dimmed);
}

.portfolio_name_follows p span {
    color: var(--tx-normal);
}

.joined {
    font-family: Axiforma;
    font-size: 14px;
    font-weight: 400;
    color: var(--tx-dimmed);
    margin-top: 12px;
}

.portfolio_follows {
    display: flex;
    align-items: center;
    gap: 24px;
}

.settings_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    background: var(--bg-dark);
    width: 123px;
    height: 40px;
    cursor: pointer;
    border: none;
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    border-radius: 6px;
    color: var(--tx-normal);
}

.flash_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--primary);
    width: 40px;
    height: 40px;
    cursor: pointer;
    border: none;
    border-radius: 6px;
}

.menu_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-dark);
    width: 40px;
    height: 40px;
    cursor: pointer;
    border: none;
    border-radius: 6px;
}

.toolbar {
    margin-top: 76px;
    width: 100%;
    height: 40px;
    padding: 0 60px;
    border-bottom: 1px var(--bg-darkest) solid;
    display: flex;
    justify-content: space-between;
    backdrop-filter: blur(8px);
    background: rgba(255, 255, 255, 0.8);
}

.tab_items {
    display: flex;
    gap: 20px;
    height: 100%;
}

.tab {
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 0 20px;
    border-bottom: 2px solid transparent;
}

.tab p {
    font-weight: 500;
    font-size: 16px;
    color: var(--tx-dimmed);
}

.tab_active p {
    color: var(--tx-normal);
}

.tab_active {
    border-bottom: 2px solid var(--primary-light);
}

.filter_items {
    display: flex;
    gap: 20px;
}

.filter {
    gap: 10px;
    padding: 10px 20px;
    background: var(--primary-light);
    border-radius: 4px 4px 0px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    margin-top: -2px;
}

.filter p {
    font-weight: 500;
    font-size: 14px;
    color: var(--tx-normal);
}
</style>