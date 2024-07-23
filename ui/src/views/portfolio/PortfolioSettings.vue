<script setup lang="ts">
import ArrowRightIcon from '@/components/icons/ArrowRightIcon.vue';
import ImportIcon from '@/components/icons/ImportIcon.vue';
import ProgressBox from '@/components/ProgressBox.vue';
import TickSquareIcon from '@/components/icons/TickSquareIcon.vue';
import EditIcon from '@/components/icons/EditIcon.vue';
import ThurbeAPI from '@/scripts/thurbe-api';
import { onMounted, ref } from "vue";
import { type ChannelForm, type Channel } from '@/types';
import Storage from '@/scripts/storage';
import Contract from '@/scripts/contract';
import Converter from '@/scripts/converter';
import { notify } from '@/reactives/notify';
import { useRouter } from 'vue-router';
import { useWalletStore } from '@/stores/wallet';

const updating = ref<boolean>(false);
const loading = ref<boolean>(true);
const existingChannel = ref<Channel | null>(null);
const walletStore = useWalletStore();
const activeTab = ref<number>(1);
const router = useRouter();
const channel = ref<ChannelForm>({
    cover_file: undefined,
    image_file: undefined,
    name: undefined,
    cover_file_url: undefined,
    image_file_url: undefined,
    super_amount: undefined,
    super_follow: false
});

const selectCover = (event: any) => {
    const files = event.target.files;
    if (files.length > 0) {
        channel.value.cover_file_url = URL.createObjectURL(files[0]);
        channel.value.cover_file = files[0];
    }
    else {
        channel.value.cover_file = undefined;
    }
};

const selectImage = (event: any) => {
    const files = event.target.files;
    if (files.length > 0) {
        channel.value.image_file_url = URL.createObjectURL(files[0]);
        channel.value.image_file = files[0];
    }
    else {
        channel.value.image_file = undefined;
    }
};

const updateChannel = async () => {
    if (Boolean(existingChannel) && Boolean(existingChannel?.value?.name)) {
        router.push('/portfolio');
        return;
    }

    if (updating.value) return;

    if (!walletStore.address) {
        notify.push({
            title: 'Error: Connect your wallet',
            description: 'Wallet connection is mandatory',
            category: 'error'
        });
        return;
    }

    if (!channel.value.cover_file) {
        notify.push({
            title: 'Error: Select a channel cover file',
            description: 'Channel cover file is mandatory',
            category: 'error'
        });
        return;
    }

    if (!channel.value.image_file) {
        notify.push({
            title: 'Error: Select a channel image file',
            description: 'Channel image file is mandatory',
            category: 'error'
        });
        return;
    }

    if (!channel.value.name) {
        notify.push({
            title: 'Error: Enter a video title',
            description: 'Video title is mandatory',
            category: 'error'
        });
        return;
    }

    if (channel.value.super_follow && !channel.value.super_amount) {
        notify.push({
            title: 'Error: Enter a super follow fee',
            description: 'Super follow fee is mandatory',
            category: 'error'
        });
        return;
    }

    updating.value = true;

    const cover_url = await Storage.awaitUpload(
        channel.value.cover_file,
        'portfolio_cover_' + walletStore.address
    );

    const image_url = await Storage.awaitUpload(
        channel.value.image_file,
        'portfolio_image_' + walletStore.address
    );

    const txHash1 = await Contract.createStreamer(
        JSON.stringify({
            name: channel.value.name,
            description: `${channel.value.name} followers NFT.`,
            image: 'https://thurbe.xyz/images/basic_nft.png'
        }),
        channel.value.name,
        channel.value.name.toLocaleUpperCase(),
        Converter.toWei(channel.value.super_amount || 0),
        JSON.stringify({
            name: channel.value.name,
            description: `${channel.value.name} super followers NFT.`,
            image: image_url
        })
    );

    if (!txHash1) {
        notify.push({
            title: 'Error: Interracting with smart contracts',
            description: 'Please try again',
            category: 'error'
        });
        updating.value = false;
        return;
    }

    const createdChannel = await ThurbeAPI.createChannel(
        walletStore.address,
        channel.value.name!,
        image_url,
        cover_url
    );

    if (!createdChannel) {
        notify.push({
            title: 'Error: Failed to create channel',
            description: 'Try again later',
            category: 'error'
        });
        updating.value = false;
        return;
    }

    const account = await ThurbeAPI.getAccount(walletStore.address);
    walletStore.setAccount(account);

    notify.push({
        title: 'Successful: Channel created',
        description: 'Your channel has been updated successfully',
        category: 'success'
    });
    updating.value = false;

    router.push('/portfolio');
};

const getChannel = async () => {
    loading.value = true;
    existingChannel.value = await ThurbeAPI.getChannel(walletStore.address as any);

    if (existingChannel.value) {
        channel.value = {
            name: existingChannel.value.name,
            cover_file_url: existingChannel.value.cover || undefined,
            image_file_url: existingChannel.value.image,
            super_follow: true,
            super_amount: undefined,
            cover_file: undefined,
            image_file: undefined
        };
    }

    loading.value = false;
};

onMounted(() => {
    getChannel();
});
</script>

<template>
    <div class="load_frame" v-if="loading">
        <ProgressBox />
    </div>

    <div class="settings_container" v-else-if="!loading">
        <div class="toolbar_header">
            <div class="toolbar">
                <div class="nav_items">
                    <RouterLink to="/portfolio">
                        <div class="nav">
                            <ArrowRightIcon />
                            <p>Back</p>
                        </div>
                    </RouterLink>
                </div>
                <div class="tab_items">
                    <div :class="activeTab == 1 ? 'tab tab_active' : 'tab'">
                        <p>Channel Settings</p>
                    </div>
                </div>
                <div class="nav_items">

                    <div class="nav nav_action" @click="updateChannel">
                        <EditIcon />
                        <p>
                            {{ updating ? 'Creating' : 'Create' }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="detail_form_wrapper">
            <div class="detail_form" v-show="activeTab == 1">
                <div class="input">
                    <p class="label">Cover Pic <span>*</span></p>
                    <div class="file_picker">
                        <img :src="channel.cover_file_url" alt="" />
                        <div class="file_picker_text">
                            <input type="file" :disabled="Boolean(existingChannel)" accept="image/*"
                                @change="selectCover">
                            <div class="file_picker_text_text">
                                <ImportIcon />
                                <p><span>Click to upload</span> PG or PNG 400 x 100px recommended</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="input">
                    <p class="label">Logo Pic <span>*</span></p>
                    <div class="file_picker">
                        <img :src="channel.image_file_url" alt="" class="profile_pic" />
                        <div class="file_picker_text">
                            <input type="file" :disabled="Boolean(existingChannel)" accept="image/*"
                                @change="selectImage">
                            <div class="file_picker_text_text">
                                <ImportIcon />
                                <p><span>Click to upload</span> PG or PNG 100 x 100px recommended</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="input">
                    <p class="label">Name <span>*</span></p>
                    <input type="text" placeholder="John Doe" :disabled="Boolean(existingChannel)"
                        v-model="channel.name" />
                </div>

                <div class="input" v-show="!existingChannel">
                    <div class="label_wrapper">
                        <div class="label">
                            Super Follow
                        </div>

                        <div class="public_check">
                            <p>Enabled</p>
                            <div class="checkbox" @click="channel.super_follow = !channel.super_follow">
                                <TickSquareIcon :active="channel.super_follow" />
                            </div>
                        </div>
                    </div>

                    <p class="accept_tip_desc">
                        By enabling this feature you can monetize your page by generating a revenue from your loyal
                        followers. </p>
                </div>


                <div class="input" v-show="!Boolean(existingChannel)">
                    <p class="label">Set Super Follow Fee (TFUEL) <span>*</span></p>
                    <input type="number" placeholder="0.00" v-model="channel.super_amount" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.toolbar_header {
    top: 90px;
    position: sticky;
    z-index: 2;
    height: 40px;
}

.toolbar {
    margin-top: 60px;
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

.nav_items {
    display: flex;
    gap: 20px;
}

.nav {
    gap: 10px;
    padding: 10px 20px;
    background: var(--bg-dark);
    border-radius: 4px 4px 0px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
}

.nav p {
    font-weight: 500;
    font-size: 14px;
    color: var(--tx-normal);
}

.nav_action {
    background: var(--primary-light);
    cursor: pointer;
}

.nav_action p {
    background: var(--primary-light);
}

.detail_form_wrapper {
    display: flex;
    justify-content: center;
    margin-top: 60px;
}

.detail_form {
    width: 550px;
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.input {
    width: 100%;
    user-select: none;
}

.label {
    font-size: 14px;
    font-weight: 500;
    color: var(--tx-normal);
    margin-bottom: 20px;
}

.label span {
    color: rgba(255, 0, 102, 0.6);
}

.file_picker {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.file_picker>img,
.file_picker>video {
    width: 318px;
    height: 160px;
    border-radius: 8px;
    object-fit: cover;
    background-image: url(/images/image_default.png);
    background-repeat: no-repeat;
    background-color: var(--bg-dark);
    background-position: center center;
}

.file_picker_text {
    display: flex;
    justify-content: center;
    position: relative;
}

.file_picker_text input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
}

.file_picker_text_text {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    width: 183px;
}

.file_picker_text_text p {
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
    text-align: center;
    color: var(--tx-dimmed);
}

.file_picker_text_text p span {
    color: var(--tx-normal);
    text-decoration: underline;
}

.input>input {
    width: 100%;
    height: 44px;
    padding: 0 14px;
    border-radius: 6px;
    border: 1px solid var(--tx-dimmed);
    font-size: 14px;
    font-weight: 500;
    color: var(--tx-normal);
    outline: none;
}

.input>textarea {
    width: 100%;
    padding: 12px 14px;
    border-radius: 6px;
    border: 1px solid var(--tx-dimmed);
    font-size: 14px;
    font-weight: 500;
    color: var(--tx-normal);
    outline: none;
    resize: none;
}

.input>input::placeholder,
.input>textarea::placeholder {
    color: var(--tx-dimmed);
}

.label_wrapper {
    display: flex;
    justify-content: space-between;
}

.public_check p {
    font-size: 14px;
    font-weight: 500;
    color: var(--tx-semi);
}

.accept_tip_desc {
    width: 341px;
    max-width: 100%;
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    color: var(--tx-dimmed);
}

.detail_container_1 {
    width: 650px;
}

.public_check {
    display: flex;
    align-items: center;
    gap: 10px;
}

.public_check .checkbox {
    cursor: pointer;
}

.profile_pic {
    width: 160px !important;
}

.nav:first-child {
    margin-top: -2px;
}
</style>