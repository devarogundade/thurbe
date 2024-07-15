<script setup lang="ts">
import UserAddIcon from '@/components/icons/UserAddIcon.vue';
import VideoCircleIcon from '@/components/icons/VideoCircleIcon.vue';
import RadarIcon from '@/components/icons/RadarIcon.vue';
</script>

<template>
    <div class="videos">
        <RouterLink v-for="num, index in 14" :key="index" :to="`/explore/videos/${num}`">
            <div class="video">
                <div class="thumbnail">
                    <img src="/images/game.png" alt="">
                    <div class="play_button"></div>
                </div>
                <div class="detail">
                    <div class="detail_content">
                        <img src="/images/game.png" alt="">
                        <div class="detail_text">
                            <h3>Top 10 Best Cartoon Movies</h3>
                            <p>The CartoonistGuy. 6 Days ago</p>
                        </div>
                    </div>

                    <button class="follow_button">
                        <UserAddIcon />
                        <p>Follow</p>
                    </button>
                </div>
                <div class="stats">
                    <div class="stat">
                        <VideoCircleIcon />
                        <p><span>21</span> Videos</p>
                    </div>

                    <div class="stat">
                        <RadarIcon />
                        <p><span>59</span> Streams</p>
                    </div>
                </div>
            </div>
        </RouterLink>
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
    width: 480px;
    border-radius: 8px;
    overflow: hidden;
    background: var(--bg-dark);
}

.video .thumbnail {
    height: 120px;
    position: relative;
    width: 100%;
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
    width: 105px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border: none;
    cursor: pointer;
    user-select: none;
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