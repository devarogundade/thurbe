<script setup lang="ts">
import UserFullIcon from '@/components/icons/UserFullIcon.vue';
import UserAddIcon from '@/components/icons/UserAddIcon.vue';
import UserCheckIcon from '@/components/icons/UserCheckIcon.vue';
import FlashIcon from '@/components/icons/FlashIcon.vue';
import ThreeDotsIcon from '@/components/icons/ThreeDotsIcon.vue';
import SortIcon from '@/components/icons/SortIcon.vue';
import Converter from '@/scripts/converter';
import { useWalletStore } from '@/stores/wallet';
import { useRoute } from 'vue-router';
import Contract from '@/scripts/contract';
import ThurbeAPI from '@/scripts/thurbe-api';
import { notify } from '@/reactives/notify';
import { ref } from "vue";
import SuperFollow from '@/views/pops/SuperFollow.vue';

const route = useRoute();
const walletStore = useWalletStore();
const following = ref<boolean>(false);
const superFollowing = ref<boolean>(false);

const emit = defineEmits(['refresh']);

const props = defineProps({
    channel: { type: Object, required: true },
    isSuperFollow: { type: Boolean },
    isFollow: { type: Boolean },
    superFollowAmount: { required: true }
});

const super_follow = ref({
    open: false,
    loading: false
});

const follow = async () => {
    if (following.value) return;
    if (!walletStore.address) {
        notify.push({
            title: 'Error: Connect your wallet',
            description: 'Wallet connection is mandatory',
            category: 'error'
        });
        return;
    }

    following.value = true;

    const txHash = await Contract.mintCard(
        props.channel.owner.address as `0x${string}`,
        walletStore.address,
        false,
        BigInt(0)
    );

    if (txHash) {
        notify.push({
            title: 'Successful: Followed ' + props.channel.name,
            description: 'Your profile has been updated successfully',
            category: 'success'
        });

        await ThurbeAPI.followAccount(
            props.channel.owner.address as `0x${string}`,
            walletStore.address
        );

        emit('refresh');
    }

    following.value = false;
};

const superFollow = async () => {
    if (superFollowing.value) return;
    if (!walletStore.address) {
        notify.push({
            title: 'Error: Connect your wallet',
            description: 'Wallet connection is mandatory',
            category: 'error'
        });
        return;
    }

    superFollowing.value = true;

    const txHash = await Contract.mintCard(
        props.channel.owner.address as `0x${string}`,
        walletStore.address,
        true,
        // @ts-ignore
        props.superFollowAmount
    );

    super_follow.value.open = false;

    if (txHash) {
        notify.push({
            title: 'Successful: Super followed ' + props.channel?.name,
            description: 'Your profile has been updated successfully',
            category: 'success'
        });

        await ThurbeAPI.followAccount(
            props.channel.owner.address as `0x${string}`,
            walletStore.address
        );

        emit('refresh');
    }

    superFollowing.value = false;
};

const isCreator = (): boolean => {
    return (props.channel.owner.address == walletStore.address?.toLocaleLowerCase());
};
</script>

<template>
    <div class="channel_container">
        <div class="channel_header">
            <img :src="props.channel.cover || '/images/image_default.png'" alt="" class="channel_header_cover">
            <div class="channel_header_content">
                <div class="channel_name">
                    <img :src="props.channel.image" alt="">
                    <div class="channel_name_text">
                        <h3>{{ props.channel.name }}</h3>
                        <div class="channel_name_follows">
                            <UserFullIcon />
                            <p><span>{{ props.channel.owner?.followers?.length }}</span> Followers
                            </p>
                        </div>
                        <p class="joined">Joined {{ Converter.fullMonth(
                            new Date(props.channel.created_at)
                        ) }}</p>
                    </div>
                </div>

                <div class="channel_follows_wrapper">
                    <div class="channel_follows" v-if="!isCreator()">
                        <button v-if="isSuperFollow" class="creator_follow_super">
                            <div class="creator_follow_icon">
                                <FlashIcon :color="'var(--tx-normal)'" />
                            </div>
                            <p>Following</p>
                        </button>

                        <button v-else-if="isFollow">
                            <UserCheckIcon />
                            <p>Following</p>
                        </button>

                        <button v-else-if="!isFollow" @click="follow" class="creator_follow_light">
                            <UserAddIcon />
                            <p>{{ following ? 'Loading..' : 'Follow' }}</p>
                        </button>

                        <button v-if="!isSuperFollow" @click="super_follow.open = true">
                            <FlashIcon />
                        </button>
                    </div>

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

        <SuperFollow :loading="superFollowing" :channel="props.channel" :amount="props.superFollowAmount"
            v-if="super_follow.open" @close="super_follow.open = false" @continue="superFollow" />
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

.channel_follows_wrapper {
    display: flex;
    align-items: center;
    gap: 24px;
}

.channel_follows {
    display: flex;
    align-items: center;
    gap: 24px;
}

.channel_follows button:first-child {
    padding: 0 20px;
    height: 40px;
    gap: 12px;
    border-radius: 6px;
    background: var(--bg-dark);
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
}

.channel_follows button:first-child p {
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    color: var(--tx-normal);
}

.channel_follows button:last-child {
    width: 40px;
    height: 40px;
    border-radius: 6px;
    background: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
}

.creator_follow_super {
    display: flex;
    width: unset !important;
    padding: 0 !important;
    background: var(--bg-darker) !important;
    padding-right: 20px !important;
    overflow: hidden;
}

.creator_follow_light {
    background: var(--primary-light) !important;
}

.creator_follow_icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-darkest);
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