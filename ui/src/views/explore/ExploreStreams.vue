<script setup lang="ts">
import UserGroupIcon from '@/components/icons/UserGroupIcon.vue';
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

                    <div class="detail_view">
                        <div class="views">Viewers</div>
                        <div class="views_count">
                            <p>25.4k</p>
                            <UserGroupIcon />
                        </div>
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