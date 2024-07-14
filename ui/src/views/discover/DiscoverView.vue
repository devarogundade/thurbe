<script setup lang="ts">
import RtmpPlayer from '@/components/RtmpPlayer.vue';
</script>

<template>
    <main>
        <RtmpPlayer :src="'rtmp://34.173.223.115:1935/live'" />
        <RouterView />
    </main>
</template>