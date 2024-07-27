<script setup lang="ts">
import UserGroupIcon from '@/components/icons/UserGroupIcon.vue';
import ProgressBox from '@/components/ProgressBox.vue';
import RadarIcon from '@/components/icons/RadarIcon.vue';
import { type Stream, type Account } from "@/types";
import PlayCircleIcon from '@/components/icons/PlayCircleIcon.vue';
import { onMounted, ref } from "vue";
// @ts-ignore
import { format as formatDate } from 'timeago.js';
import Converter from '@/scripts/converter';
import ThurbeAPI from '@/scripts/thurbe-api';

const loading = ref<boolean>(true);
const streams = ref<Stream[]>([]);

const getStreams = async () => {
    loading.value = true;
    const result = await ThurbeAPI.getStreams(1, 'undefined');
    console.log(result);
    if (result && result.data) {
        streams.value = result.data;
    }
    loading.value = false;
};

onMounted(() => {
    getStreams();
});
</script>

<template>
    <div class="load_frame" v-if="loading">
        <ProgressBox />
    </div>

    <div class="streams" v-else-if="!loading && streams.length > 0">
        <RouterLink v-for="stream, index in streams" :key="index" :to="`/streams/${stream.streamId}`">
            <div class="stream">
                <div class="thumbnail">
                    <img :src="stream.thumbnail" alt="">
                    <div class="play_button">
                        <PlayCircleIcon />
                    </div>
                    <div class="live" v-show="stream.live">
                        <RadarIcon />
                        <p>Live</p>
                    </div>
                </div>
                <div class="detail">
                    <div class="detail_content">
                        <img :src="(stream.streamer as Account).channel?.image || '/images/image_default.png'" alt="">
                        <div class="detail_text">
                            <h3>{{ stream.name }}</h3>
                            <p>{{ (stream.streamer as Account).channel?.name }}. {{ formatDate(stream.created_at) }}</p>
                        </div>
                    </div>

                    <div class="detail_view">
                        <div class="views">Viewers</div>
                        <div class="views_count">
                            <p>{{ Converter.formatNumber(stream.viewers.length) }}</p>
                            <UserGroupIcon />
                        </div>
                    </div>
                </div>
            </div>
        </RouterLink>

        <div class="stream" v-if="streams.length % 2 == 1"></div>
    </div>

    <div class="empty" v-else>
        <img src="/images/empty.png" alt="">
        <p>No streams.</p>
    </div>
</template>

<style scoped>
.streams {
    padding: 40px 20px;
    display: flex;
    column-gap: 50px;
    row-gap: 40px;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}

.stream {
    width: 482px;
    max-width: 100%;
    border-radius: 8px;
    overflow: hidden;
    background: var(--bg-dark);
}

.stream .thumbnail {
    height: 270px;
    position: relative;
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
}

.stream .thumbnail img {
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

.detail_view {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.views {
    font-size: 12px;
    font-weight: 500;
    color: var(--tx-dimmed);
}

.views_count p {
    margin-top: 4px;
    font-size: 12px;
    font-weight: 500;
    color: var(--tx-normal);
}

.views_count {
    margin-top: 6px;
    display: flex;
    align-items: center;
    gap: 4px;
}
</style>