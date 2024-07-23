<script setup lang="ts">
import CloseIcon from '@/components/icons/CloseIcon.vue';
import HomeWifiIcon from '@/components/icons/HomeWifiIcon.vue';
import DriverIcon from '@/components/icons/DriverIcon.vue';
import RadioToggleIcon from '@/components/icons/RadioToggleIcon.vue';
import { StreamType } from '@/types';
import { ref } from 'vue';

const emit = defineEmits(['continue']);
const streamType = ref<StreamType>(StreamType.External);
</script>

<template>
    <div class="blur">
        <div class="container">
            <div class="close" @click="emit('continue', streamType)">
                <CloseIcon />
            </div>

            <div class="title">
                <h3>Want to Go Live? </h3>
                <p>Choose a suitable Broadcast Method for your stream to Continue.</p>
            </div>

            <div class="viewers">
                <div class="viewer" @click="streamType = StreamType.Direct">
                    <div class="radio">
                        <RadioToggleIcon :active="streamType == StreamType.Direct" />
                    </div>
                    <div class="viewer_title">
                        <HomeWifiIcon />
                        <p>Use a Direct stream</p>
                    </div>
                    <p class="viewer_desc">
                        Go live sharing your screen using Thurbe’s Broadcasting setup presets , Recommend for users new
                        to streaming.
                    </p>
                </div>

                <div class="viewer" @click="streamType = StreamType.External">
                    <div class="radio">
                        <RadioToggleIcon :active="streamType == StreamType.External" />
                    </div>
                    <div class="viewer_title">
                        <DriverIcon />
                        <p>Use a Streaming Software</p>
                    </div>
                    <p class="viewer_desc">
                        Broadcast your stream to Thurbe from an external software with control over your choice of
                        broadcast setup preset.
                    </p>
                </div>
            </div>

            <div class="start">
                <button @click="emit('continue', streamType)">Continue</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.blur {
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(219, 219, 219, 0.4);
    z-index: 10;
    top: 0;
    left: 0;
    backdrop-filter: blur(3px);
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 420px;
    border-radius: 6px;
    padding: 30px;
    padding-top: 20px;
    background: var(--bg);
}

.close {
    display: flex;
    justify-content: flex-end;
    width: 100%;
}

.close svg {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    background: var(--bg-darkest);
    cursor: pointer;
}

.title {
    width: 318px;
    max-width: 100%;
    text-align: center;
}

.title h3 {
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    color: var(--tx-normal);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
}

.title p {
    margin-top: 14px;
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
    color: var(--tx-dimmed);
}

.viewers {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 30px;
}

.viewer {
    padding: 14px;
    border-radius: 6px;
    border: 1px solid var(--bg-darkest);
    position: relative;
    cursor: pointer;
}

.viewer_title {
    display: flex;
    align-items: center;
    gap: 12px;
}

.viewer_title p {
    font-size: 14px;
    font-weight: 500;
    color: var(--tx-normal);
}

.viewer_desc {
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    color: var(--tx-dimmed);
    margin-top: 10px;
}

.viewer .radio {
    position: absolute;
    top: 16px;
    right: 14px;
}

.start {
    margin-top: 20px;
    width: 100%;
}

.start button {
    width: 100%;
    height: 50px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--primary);
    user-select: none;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    color: var(--bg);
    border: none;
}
</style>