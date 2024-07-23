<script setup lang="ts">
import ArrowRightIcon from '@/components/icons/ArrowRightIcon.vue';
import ImportIcon from '@/components/icons/ImportIcon.vue';
import ExportIcon from '@/components/icons/ExportIcon.vue';
import FlashIcon from '@/components/icons/FlashIcon.vue';
import UserFullIcon from '@/components/icons/UserFullIcon.vue';
import LikeIcon from '@/components/icons/LikeIcon.vue';
import DislikeIcon from '@/components/icons/DislikeIcon.vue';
import ShareIcon from '@/components/icons/ShareIcon.vue';
import UserGroupIcon from '@/components/icons/UserGroupIcon.vue';
import CalendarIcon from '@/components/icons/CalendarIcon.vue';
import RadioToggleIcon from '@/components/icons/RadioToggleIcon.vue';
import TickSquareIcon from '@/components/icons/TickSquareIcon.vue';
import { ref } from 'vue';
import { ViewerType, StreamType, type StreamForm } from '@/types';
import { notify } from '@/reactives/notify';
import Contract from '@/scripts/contract';
import ThetaAPI from '@/scripts/theta-api';
import ThurbeAPI from '@/scripts/thurbe-api';
import Storage from '@/scripts/storage';
import { useWalletStore } from '@/stores/wallet';
import GoLiveOption from '@/views/pops/GoLiveOption.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import { useRouter } from 'vue-router';
import '@vuepic/vue-datepicker/dist/main.css';

const walletStore = useWalletStore();
const router = useRouter();
const uploading = ref<boolean>(false);
const activeTab = ref<number>(1);
const stream = ref<StreamForm>({
    name: undefined,
    description: null,
    thumbnail: undefined,
    thumbnail_file_url: undefined,
    viewerType: ViewerType.Follower,
    streamType: StreamType.Direct,
    tips: false,
    start_at: new Date()
});

const back = () => {
    if (activeTab.value == 2) {
        activeTab.value = 1;
    }
};

const next = () => {
    if (activeTab.value == 1) {
        activeTab.value = 2;
    }
};

const selectThumbnail = (event: any) => {
    const files = event.target.files;
    if (files.length > 0) {
        stream.value.thumbnail_file_url = URL.createObjectURL(files[0]);
        stream.value.thumbnail = files[0];
    }
    else {
        stream.value.thumbnail = undefined;
    }
};

const switchViewers = (viewerType: ViewerType) => {
    if (stream.value.viewerType == viewerType && viewerType == ViewerType.Everyone) {
        stream.value.viewerType = ViewerType.Follower;
    } else {
        stream.value.viewerType = viewerType;
    }
};

const showOption = ref<boolean>(true);

const selectStreamType = (type: StreamType) => {
    stream.value.streamType = type;
    showOption.value = false;
};

const uploadVideo = async () => {
    if (uploading.value) return;

    if (!walletStore.address) {
        notify.push({
            title: 'Error: Connect your wallet',
            description: 'Wallet connection is mandatory',
            category: 'error'
        });
        return;
    }

    if (!stream.value.name) {
        notify.push({
            title: 'Error: Enter a video title',
            description: 'Stream title is mandatory',
            category: 'error'
        });
        return;
    }

    if (!stream.value.thumbnail) {
        notify.push({
            title: 'Error: Select a video thumbnail',
            description: 'Stream thumbnail is mandatory',
            category: 'error'
        });
        return;
    }

    uploading.value = true;

    const streamId = Contract.newId();

    const txHash = await Contract.startStream(
        streamId,
        stream.value.viewerType == ViewerType.SuperFollower,
        stream.value.tips
    );

    if (!txHash) {
        notify.push({
            title: 'Error: Interracting with smart contracts',
            description: 'Please try again',
            category: 'error'
        });
        uploading.value = false;
        return;
    }

    const streamResponse = await ThetaAPI.createStream(stream.value.name);

    if (!streamResponse) {
        notify.push({
            title: 'Error: Uploading video file',
            description: 'Please try again',
            category: 'error'
        });
        uploading.value = false;
        return;
    }

    Storage.upload(stream.value.thumbnail, streamId, async (thumbnailUrl: string) => {
        const upload = await ThurbeAPI.createStream(
            streamId,
            walletStore.address!,
            stream.value.name!,
            stream.value.description,
            streamResponse.id,
            thumbnailUrl,
            stream.value.viewerType,
            stream.value.streamType,
            stream.value.tips,
            stream.value.start_at
        );

        if (!upload) {
            notify.push({
                title: 'Error: Uploading video file',
                description: 'Please try again',
                category: 'error'
            });
            uploading.value = false;
            return;
        }

        notify.push({
            title: 'Successful: Stream created',
            description: 'We have notified your followers',
            category: 'success'
        });
        uploading.value = false;

        router.push('/portfolio');
    }, () => {
        notify.push({
            title: 'Error: Uploading video file',
            description: 'Please try again',
            category: 'error'
        });
        uploading.value = false;
    });
};
</script>

<template>
    <div class="upload_container">
        <div class="toolbar_header">
            <div class="toolbar">
                <div class="nav_items">
                    <div class="nav" @click="back">
                        <ArrowRightIcon />
                        <p>Back</p>
                    </div>
                </div>
                <div class="tab_items">
                    <div :class="activeTab == 1 ? 'tab tab_active' : 'tab'">
                        <p>Stream Details</p>
                    </div>
                    <div :class="activeTab == 2 ? 'tab tab_active' : 'tab'">
                        <p>Preview</p>
                    </div>
                </div>
                <div class="nav_items">
                    <div class="nav" @click="next" v-if="activeTab == 1">
                        <ArrowRightIcon style="rotate: 180deg;" />
                        <p>Next</p>
                    </div>

                    <div class="nav nav_action" @click="uploadVideo" v-if="activeTab == 2">
                        <ExportIcon />
                        <p>{{ uploading ? 'Creating' : 'Create stream' }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="detail_form_wrapper">
            <div class="detail_form" v-show="activeTab == 1">
                <div class="input">
                    <p class="label">Stream Title <span>*</span></p>
                    <input type="text" placeholder="John Doe" v-model="stream.name" />
                </div>

                <div class="input">
                    <p class="label">Description</p>
                    <textarea name="" id="" cols="30" rows="4" v-model="stream.description"
                        placeholder="What the video is about and more"></textarea>
                </div>

                <div class="input">
                    <p class="label">Thumbnail <span>*</span>
                        <RouterLink to="/ai">Generate with ThurbeAI</RouterLink>
                    </p>
                    <div class="file_picker">
                        <img :src="stream.thumbnail_file_url" alt="">
                        <div class="file_picker_text">
                            <input type="file" accept="image/*" @change="selectThumbnail">
                            <div class="file_picker_text_text">
                                <ImportIcon />
                                <p><span>Click to upload</span> tJPG or PNG 1920 x 1080px recommended</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="input">
                    <div class="label_wrapper">
                        <div class="label">
                            Who can view content <span>*</span>
                        </div>

                        <div class="public_check">
                            <p>Everyone Instead</p>
                            <div class="checkbox" @click="switchViewers(ViewerType.Everyone)">
                                <TickSquareIcon :active="stream.viewerType == ViewerType.Everyone" />
                            </div>
                        </div>
                    </div>

                    <div class="viewers">
                        <div class="viewer" @click="switchViewers(ViewerType.Follower)">
                            <div class="radio">
                                <RadioToggleIcon :active="stream.viewerType == ViewerType.Follower" />
                            </div>
                            <div class="viewer_title">
                                <UserFullIcon />
                                <p>Followers Only</p>
                            </div>
                            <p class="viewer_desc">
                                Content is viewable to users that at least to either follow or Super follow
                            </p>
                        </div>

                        <div class="viewer" @click="switchViewers(ViewerType.SuperFollower)">
                            <div class="radio">
                                <RadioToggleIcon :active="stream.viewerType == ViewerType.SuperFollower" />
                            </div>
                            <div class="viewer_title">
                                <FlashIcon />
                                <p>Super Followers Only</p>
                            </div>
                            <p class="viewer_desc">
                                Content is only viewable by users that super follows.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="input">
                    <p class="label">Start Stream In <span>*</span></p>
                    <VueDatePicker v-model="stream.start_at"></VueDatePicker>
                </div>

                <div class="input">
                    <div class="label_wrapper">
                        <div class="label">
                            Accept Tips on this Stream
                        </div>

                        <div class="public_check">
                            <p>Enabled</p>
                            <div class="checkbox" @click="stream.tips = !stream.tips">
                                <TickSquareIcon :active="stream.tips" />
                            </div>
                        </div>
                    </div>

                    <p class="accept_tip_desc">
                        Generate revenues from contents creation by receiving Tips from content consumers.
                    </p>
                </div>
            </div>

            <div class="detail_container_1" v-show="activeTab == 2">
                <div class="video_wrapper">
                    <img :src="stream.thumbnail_file_url" alt="" class="thumbnail">
                </div>

                <div class="video_info">
                    <div class="video_title">
                        <h3>{{ stream.name || 'Untitled' }}</h3>
                        <p>0 Mins ago</p>
                    </div>

                    <div class="video_reactions">
                        <div class="video_reaction">
                            <LikeIcon />
                        </div>
                        <div class="video_reaction">
                            <DislikeIcon />
                        </div>
                        <div class="video_reaction">
                            <ShareIcon />
                        </div>
                    </div>
                </div>

                <div class="video_contents">
                    <div class="video_contents_stats">
                        <div class="video_contents_stat">
                            <div class="video_contents_stat_icon">
                                <UserGroupIcon />
                            </div>
                            <div class="video_contents_stat_text">
                                <p>Views</p>
                                <h3>----</h3>
                            </div>
                        </div>

                        <div class="video_contents_stat">
                            <div class="video_contents_stat_icon">
                                <LikeIcon />
                            </div>
                            <div class="video_contents_stat_text">
                                <p>Likes</p>
                                <h3>----</h3>
                            </div>
                        </div>

                        <div class="video_contents_stat">
                            <div class="video_contents_stat_icon">
                                <CalendarIcon />
                            </div>
                            <div class="video_contents_stat_text">
                                <p>Posted On</p>
                                <h3>----</h3>
                            </div>
                        </div>
                    </div>

                    <div class="video_contents_desc">
                        <p>{{ stream.description || 'No description' }}</p>
                    </div>
                </div>
            </div>
        </div>

        <GoLiveOption v-if="showOption" @continue="selectStreamType" />
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

.label a {
    font-size: 14px;
    font-weight: 500;
    color: var(--primary);
}

.label span {
    color: rgba(255, 0, 102, 0.6);
    margin-right: 4px;
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

.viewers {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    user-select: none;
}

.viewer {
    padding: 14px;
    border-radius: 6px;
    border: 1px solid var(--bg-darkest);
    position: relative;
    cursor: pointer;
}

.viewer .radio {
    position: absolute;
    top: 16px;
    right: 14px;
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


.video_wrapper {
    width: 100%;
    height: 326px;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
}

.thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-image: url(/images/image_default.png);
    background-repeat: no-repeat;
    background-color: var(--bg-dark);
    background-position: center center;
}

.video_info {
    margin-top: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
}

.video_title h3 {
    font-size: 14px;
    font-weight: 600;
    color: var(--tx-normal);
}

.video_title p {
    font-size: 12px;
    font-weight: 500;
    color: var(--tx-dimmed);
    margin-top: 4px;
}

.video_reactions {
    display: flex;
    align-items: center;
    gap: 20px;
}

.video_reaction {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    border: 1px solid var(--bg-darker);
    cursor: pointer;
}

.creator {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
}

.creator_info {
    display: flex;
    align-items: center;
    gap: 16px;
}

.creator_info img {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    object-fit: cover;
}

.creator_name h3 {
    font-size: 14px;
    font-weight: 500;
    color: var(--tx-normal);
}

.creator_name p {
    font-size: 12px;
    font-weight: 500;
    color: var(--tx-dimmed);
    margin-top: 4px;
}

.creator_name p span {
    color: var(--tx-normal);
}

.creator_follow {
    display: flex;
    align-items: center;
    gap: 20px;
}

.creator_follow button:first-child {
    width: 145px;
    height: 40px;
    gap: 12px;
    border-radius: 6px;
    background: var(--bg-dark);
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
}

.creator_follow button:first-child p {
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    color: var(--tx-normal);
}

.creator_follow button:last-child {
    width: 40px;
    height: 40px;
    border-radius: 6px;
    background: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
}

.video_contents {
    margin-top: 30px;
    background: var(--bg-dark);
    border-radius: 8px;
    overflow: hidden;
    width: 100%;
}

.video_contents_stats {
    border-bottom: 3px solid var(--bg);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px 30px 24px 30px;
}

.video_contents_stat {
    width: 130px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.video_contents_stat_icon {
    width: 40px;
    height: 40px;
    border-radius: 6px;
    background: var(--bg-darker);
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
}

.video_contents_stat_text p {
    font-size: 12px;
    font-weight: 500;
    color: var(--tx-dimmed);
}

.video_contents_stat_text h3 {
    font-size: 14px;
    font-weight: 500;
    color: var(--tx-normal);
    margin-top: 4px;
}

.video_contents_desc {
    padding: 24px 30px 30px 30px;
}

.video_contents_desc p {
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
    color: var(--tx-dimmed);
}

.public_check {
    display: flex;
    align-items: center;
    gap: 10px;
}

.public_check .checkbox {
    cursor: pointer;
}
</style>