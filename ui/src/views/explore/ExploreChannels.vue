<script setup lang="ts">
import UserAddIcon from '@/components/icons/UserAddIcon.vue';
import UserCheckIcon from '@/components/icons/UserCheckIcon.vue';
import VideoCircleIcon from '@/components/icons/VideoCircleIcon.vue';
import ProgressBox from '@/components/ProgressBox.vue';
import RadarIcon from '@/components/icons/RadarIcon.vue';
import { type Channel, type Account } from "@/types";
import { onMounted, ref } from "vue";
// @ts-ignore
import ThurbeAPI from '@/scripts/thurbe-api';
import { useWalletStore } from '@/stores/wallet';
const walletStore = useWalletStore();

const loading = ref<boolean>(true);
const channels = ref<Channel[]>([]);

const getChannels = async () => {
    loading.value = true;
    const result = await ThurbeAPI.getChannels(1);
    if (result && result.data) {
        channels.value = result.data;
    }
    loading.value = false;
};

onMounted(() => {
    getChannels();
});
</script>

<template>
    <div class="load_frame" v-if="loading">
        <ProgressBox />
    </div>

    <div class="channels" v-else-if="!loading && channels.length > 0">
        <RouterLink v-for="channel, index in channels" :key="index"
            :to="`/channels/${(channel.owner as Account).address}`">
            <div class="channel">
                <div class="thumbnail">
                    <img :src="channel.cover || '/images/image_default.png'" alt="">
                </div>
                <div class="detail">
                    <div class="detail_content">
                        <img :src="channel.image" alt="">
                        <div class="detail_text">
                            <h3>{{ channel.name }}</h3>
                            <p><span>{{ (channel.owner as Account).followers.length }} Followers</span></p>
                        </div>
                    </div>

                    <button class="follow_button following_button"
                        v-if="walletStore.address && ((channel.owner as Account).followers as string[]).includes(walletStore.address.toLocaleLowerCase())">
                        <UserCheckIcon />
                        <p>Following</p>
                    </button>

                    <button class="follow_button" v-else>
                        <UserAddIcon />
                        <p>Follow</p>
                    </button>
                </div>
                <div class="stats">
                    <div class="stat">
                        <VideoCircleIcon />
                        <p><span>{{ (channel.owner as Account).videos.length }}</span> Videos</p>
                    </div>

                    <div class="stat">
                        <RadarIcon />
                        <p><span>{{ (channel.owner as Account).streams.length }}</span> Streams</p>
                    </div>
                </div>
            </div>
        </RouterLink>

        <div class="channel" v-if="channels.length % 2 == 1"></div>
    </div>

    <div class="empty" v-else>
        <img src="/images/empty.png" alt="">
        <p>No channels.</p>
    </div>
</template>

<style scoped>
.channels {
    padding: 40px 20px;
    display: flex;
    column-gap: 50px;
    row-gap: 40px;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}

.channel {
    width: 482px;
    max-width: 100%;
    border-radius: 8px;
    overflow: hidden;
    background: var(--bg-dark);
}

.channel .thumbnail {
    height: 120px;
    position: relative;
    width: 100%;
}

.channel .thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.play_button {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
}

.detail {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 22px 20px;
    border-bottom: 2px solid var(--bg);
}

.detail_content {
    display: flex;
    align-items: center;
    gap: 16px;
}

.detail_content img {
    width: 42px;
    height: 42px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid var(--bg-darkest);
}

.detail_text {
    margin-top: 4px;
}

.detail_text h3 {
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    color: var(--tx-normal);
    margin-bottom: 8px;
}

.detail_text p {
    font-size: 12px;
    font-weight: 500;
    color: var(--tx-dimmed);
}

.follow_button {
    background: var(--primary-light);
    min-width: 105px;
    padding: 0 20px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    gap: 10px;
    border: none;
    cursor: pointer;
    user-select: none;
}

.following_button {
    background: var(--bg-darker) !important;
}

.follow_button p {
    font-size: 14px;
    font-weight: 500;
    color: var(--tx-normal);
}

.stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}

.stat:first-child {
    border-right: 2px solid var(--bg);
}

.stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 22px 20px;
}

.stat p {
    font-size: 14px;
    font-weight: 500;
    color: var(--tx-dimmed);
}

.stat p span {
    color: var(--tx-normal);
}
</style>