<script setup lang="ts">
import UserGroupIcon from '@/components/icons/UserGroupIcon.vue';
import { type Video, type Account } from "@/types";
import { ref } from "vue";
// @ts-ignore
import { format as formatDate } from 'timeago.js';
import Converter from '@/scripts/converter';

const videos = ref<Video[]>([]);
</script>

<template>
    <div class="videos" v-if="videos.length > 0">
        <RouterLink v-for="video, index in videos" :key="index" :to="`/videos/${video.videoId}`">
            <div class="video">
                <div class="thumbnail">
                    <img :src="video.thumbnail" alt="">
                    <div class="play_button"></div>
                </div>
                <div class="detail">
                    <div class="detail_content">
                        <img :src="(video.streamer as Account).channel?.image" alt="">
                        <div class="detail_text">
                            <h3>{{ video.name }}</h3>
                            <p>{{ (video.streamer as Account).channel?.name }}. {{ formatDate(video.created_at) }}</p>
                        </div>
                    </div>

                    <div class="detail_view">
                        <div class="views">Views</div>
                        <div class="views_count">
                            <p>{{ Converter.formatNumber(video.views) }}</p>
                            <UserGroupIcon />
                        </div>
                    </div>
                </div>
            </div>
        </RouterLink>
    </div>

    <div class="empty" v-else>
        <img src="/images/empty.png" alt="">
        <p>No videos.</p>
    </div>
</template>

<style scoped>
.videos {
    padding: 40px 20px;
    display: flex;
    column-gap: 50px;
    row-gap: 40px;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}

.video {
    width: 482px;
    max-width: 100%;
    border-radius: 8px;
    overflow: hidden;
    background: var(--bg-dark);
}

.video .thumbnail {
    height: 270px;
    position: relative;
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
}

.video .thumbnail img {
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