<script setup lang="ts">
import UserFullIcon from '@/components/icons/UserFullIcon.vue';
import UserAddIcon from '@/components/icons/UserAddIcon.vue';
import FlashIcon from '@/components/icons/FlashIcon.vue';
import ThreeDotsIcon from '@/components/icons/ThreeDotsIcon.vue';
import SortIcon from '@/components/icons/SortIcon.vue';

import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
    <div class="channel_container">
        <div class="channel_header">
            <img src="/images/game.png" alt="" class="channel_header_cover">
            <div class="channel_header_content">
                <div class="channel_name">
                    <img src="/images/game.png" alt="">
                    <div class="channel_name_text">
                        <h3>The CartoonistGuy</h3>
                        <div class="channel_name_follows">
                            <UserFullIcon />
                            <p><span>24,478</span> Followers</p>
                        </div>
                        <p class="joined">Joined November 2023</p>
                    </div>
                </div>

                <div class="channel_follows">
                    <button class="follow_btn">
                        <UserAddIcon /> Follow
                    </button>

                    <button class="flash_btn">
                        <FlashIcon />
                    </button>

                    <button class="menu_btn">
                        <ThreeDotsIcon />
                    </button>
                </div>
            </div>
        </div>

        <div class="toolbar">
            <div class="tab_items">
                <RouterLink :to="`/channels/${route.params.id}`">
                    <div :class="$route.name == 'explore-channels-channel-videos' ? 'tab tab_active' : 'tab'">
                        <p>Videos</p>
                    </div>
                </RouterLink>
                <RouterLink :to="`/channels/${route.params.id}/streams`">
                    <div :class="$route.name == 'explore-channels-channel-streams' ? 'tab tab_active' : 'tab'">
                        <p>Streams</p>
                    </div>
                </RouterLink>
            </div>
            <div class="filter_items">
                <div class="filter">
                    <SortIcon />
                    <p>Sort By</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.channel_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    top: -345px;
    position: sticky;
    z-index: 2;
}

.channel_header {
    width: 1020px;
    max-width: 100%;
}

.channel_header_cover {
    width: 100%;
    height: 240px;
    object-fit: cover;
    border-radius: 0px 0px 10px 10px;
}

.channel_header_content {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.channel_name {
    display: flex;
    align-items: center;
    gap: 40px;
}

.channel_name img {
    width: 140px;
    height: 140px;
    object-fit: cover;
    border-radius: 8px;
    border: 3px solid var(--bg-dark);
    margin-top: -30px;
    margin-left: 40px;
}

.channel_name h3 {
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    color: var(--tx-normal);
    margin-top: 12px;
}

.channel_name_follows {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 12px;
}

.channel_name_follows p {
    font-size: 14px;
    font-weight: 500;
    margin-top: 2px;
    color: var(--tx-dimmed);
}

.channel_name_follows p span {
    color: var(--tx-normal);
}

.joined {
    font-family: Axiforma;
    font-size: 14px;
    font-weight: 400;
    color: var(--tx-dimmed);
    margin-top: 12px;
}

.channel_follows {
    display: flex;
    align-items: center;
    gap: 24px;
}

.follow_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    background: var(--primary-light);
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
    background: var(--bg-dark);
    border-radius: 4px 4px 0px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.filter p {
    font-weight: 500;
    font-size: 14px;
    color: var(--tx-normal);
}
</style>