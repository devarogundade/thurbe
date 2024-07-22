<script setup lang="ts">
import LockIcon from '@/components/icons/LockIcon.vue';
import FlashIcon from '@/components/icons/FlashIcon.vue';
import LikeIcon from '@/components/icons/LikeIcon.vue';
import DislikeIcon from '@/components/icons/DislikeIcon.vue';
import ShareIcon from '@/components/icons/ShareIcon.vue';
import UserCheckIcon from '@/components/icons/UserCheckIcon.vue';
import UserAddIcon from '@/components/icons/UserAddIcon.vue';
import UserGroupIcon from '@/components/icons/UserGroupIcon.vue';
import CalendarIcon from '@/components/icons/CalendarIcon.vue';
import SortIcon from '@/components/icons/SortIcon.vue';
import SmileIcon from '@/components/icons/SmileIcon.vue';
import CoinsDollarIcon from '@/components/icons/CoinsDollarIcon.vue';
import EditIcon from '@/components/icons/EditIcon.vue';
import CloseIcon from '@/components/icons/CloseIcon.vue';
import EmojiIcon from '@/components/icons/EmojiIcon.vue';
import SendIcon from '@/components/icons/SendIcon.vue';
import MicIcon from '@/components/icons/MicIcon.vue';
import ConfigIcon from '@/components/icons/ConfigIcon.vue';
import StreamConfigs from '@/views/pops/StreamConfigs.vue';
import { type Stream, type Account, ViewerType, type Chat, StreamType } from "@/types";
import ProgressBox from '@/components/ProgressBox.vue';
import { onMounted, ref, onBeforeUnmount } from "vue";
import { useRoute } from 'vue-router';
// @ts-ignore
import { format as formatDate } from 'timeago.js';
import ThurbeAPI from '@/scripts/thurbe-api';
import SocketAPI from '@/scripts/socket-api';
import Media from '@/scripts/media';
import ThetaAPI from '@/scripts/theta-api';
import Contract, { thurbeTokenId, thurbeId } from '@/scripts/contract';
import Converter from '@/scripts/converter';
import { getAllowance, getNftBalance, approve } from '@/scripts/erc20';
import { useWalletStore } from '@/stores/wallet';
import SendTip from '@/views/pops/SendTip.vue';
import SuperFollow from '@/views/pops/SuperFollow.vue';
import { notify } from '@/reactives/notify';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { sendChat, getChats } from '@/scripts/chat-api';

const socketAPI = new SocketAPI();
const route = useRoute();
const loading = ref<boolean>(true);
const commenting = ref<boolean>(false);
const reacts = ref<boolean>(false);
const chats = ref<Chat[]>([]);
const stream = ref<Stream | null>(null);
const videoUrl = ref<string | null>(null);
const isFollow = ref<boolean>(false);
const isSuperFollow = ref<boolean>(false);
const payable = ref<boolean>(false);
const walletStore = useWalletStore();
const tip = ref({
    open: false,
    amount: undefined as number | undefined,
    loading: false
});
const super_follow = ref({
    open: false,
    amount: BigInt(0),
    loading: false
});
const streamConfigs = ref({
    open: false,
    data: {
        stream_server: '',
        stream_key: '',
        stream_reaction: '',
    }
});
const videoPlayer = ref<HTMLVideoElement | null>(null);
let player: any = null;

const getStream = async () => {
    loading.value = true;
    const result = await ThurbeAPI.getStream(route.params.id as any);
    stream.value = result;
    if (result) {
        init();
        getChats(stream.value?.streamId!, (chts: Chat[]) => {
            chats.value = chts;
        });
    }
};

const follow = async () => {
    if (!walletStore.address) {
        notify.push({
            title: 'Error: Connect your wallet',
            description: 'Wallet connection is mandatory',
            category: 'error'
        });
        return;
    }

    const txHash = await Contract.mintCard(
        (stream.value?.streamer as Account).address as `0x${string}`,
        walletStore.address,
        false,
        BigInt(0)
    );

    if (txHash) {
        notify.push({
            title: 'Successful: Followed ' + (stream.value?.streamer as Account).channel?.name,
            description: 'Your profile has been updated successfully',
            category: 'success'
        });

        await ThurbeAPI.followAccount(
            (stream.value?.streamer as Account).address as `0x${string}`,
            walletStore.address
        );

        refresh();
    } else {
        notify.push({
            title: 'Error: Interracting with smart contracts',
            description: 'Please try again',
            category: 'error'
        });
    }
};

const superFollow = async () => {
    if (!walletStore.address) {
        notify.push({
            title: 'Error: Connect your wallet',
            description: 'Wallet connection is mandatory',
            category: 'error'
        });
        return;
    }

    const txHash = await Contract.mintCard(
        (stream.value?.streamer as Account).address as `0x${string}`,
        walletStore.address,
        true,
        super_follow.value.amount
    );

    super_follow.value.open = false;

    if (txHash) {
        notify.push({
            title: 'Successful: Super followed ' + (stream.value?.streamer as Account).channel?.name,
            description: 'Your profile has been updated successfully',
            category: 'success'
        });

        await ThurbeAPI.followAccount(
            (stream.value?.streamer as Account).address as `0x${string}`,
            walletStore.address
        );

        refresh();
    } else {
        notify.push({
            title: 'Error: Interracting with smart contracts',
            description: 'Please try again',
            category: 'error'
        });
    }
};

const setTip = (amount: number) => {
    tip.value.amount = amount;
    tip.value.open = false;
};

const text = ref<undefined | string>(undefined);

const sendComment = async () => {
    if (!payable.value) {
        notify.push({
            title: 'Error: Cant send chat',
            description: 'This content is exclusive to followers or super followers',
            category: 'error'
        });
        return;
    }

    if (!stream.value?.live) {
        notify.push({
            title: 'Error: Stream is not live',
            description: 'Try again later',
            category: 'error'
        });
        return;
    }

    if (commenting.value) return;

    if (!walletStore.address) {
        notify.push({
            title: 'Error: Connect your wallet',
            description: 'Wallet connection is mandatory',
            category: 'error'
        });
        return;
    }

    if (!text) {
        notify.push({
            title: 'Error: Enter a chat text',
            description: 'Chat text is mandatory',
            category: 'error'
        });
        return;
    }

    commenting.value = true;

    if (tip.value.amount && tip.value.amount > 0) {
        const allowance = await getAllowance(
            thurbeTokenId, walletStore.address, thurbeId
        );

        if (Converter.fromWei(allowance) < tip.value.amount) {
            const txHashApprove = await approve(
                thurbeTokenId,
                thurbeId,
                Converter.toWei(tip.value.amount)
            );

            if (!txHashApprove) {
                notify.push({
                    title: 'Error: Interracting with smart contracts',
                    description: 'Please try again',
                    category: 'error'
                });
                commenting.value = false;
                return;
            }
        }

        const txHash = await Contract.tipStream(
            stream.value?.streamId as `0x${string}`,
            Converter.toWei(tip.value.amount)
        );

        if (!txHash) {
            notify.push({
                title: 'Error: Interracting with smart contracts',
                description: 'Please try again',
                category: 'error'
            });
            commenting.value = false;
            return;
        }

        notify.push({
            title: 'Successful: Tip sent',
            description: 'Thanks for tipping.',
            category: 'success'
        });
    }

    const chat: Chat = {
        channelId: stream.value?.streamId!,
        text: text.value!,
        from: {
            name: walletStore.account?.name!,
            address: walletStore.address!.toLocaleLowerCase(),
            image: walletStore.account?.image!
        },
        tip: {
            amount: tip.value.amount || 0
        },
        timestamp: new Date()
    };

    sendChat(chat);
    text.value = undefined;
    tip.value.amount = undefined;

    socketAPI.emit('chat', chat);

    commenting.value = false;
};

const like = async () => {
    if (!walletStore.address) {
        notify.push({
            title: 'Error: Connect your wallet',
            description: 'Wallet connection is mandatory',
            category: 'error'
        });
        return;
    }

    await ThurbeAPI.likeStream(
        walletStore.address,
        stream.value?.streamId!
    );

    refresh(false);
};

const dislike = async () => {
    if (!walletStore.address) {
        notify.push({
            title: 'Error: Connect your wallet',
            description: 'Wallet connection is mandatory',
            category: 'error'
        });
        return;
    }

    await ThurbeAPI.dislikeStream(
        walletStore.address,
        stream.value?.streamId!
    );

    refresh(false);
};

const react = async (emoji: string) => {
    if (!walletStore.address) {
        notify.push({
            title: 'Error: Connect your wallet',
            description: 'Wallet connection is mandatory',
            category: 'error'
        });
        return;
    }

    socketAPI.emit('reaction', {
        channelId: stream.value?.streamId!,
        emoji
    });
};

const micToggle = () => {

};

const startStream = async () => {
    let createdStream = await ThetaAPI.startStream(stream.value?.thetaId!);

    if (!createdStream) {
        const existingStream = await ThurbeAPI.getStream(stream.value?.streamId!);
        if (existingStream && existingStream.stream_server && existingStream.stream_key) {
            createdStream = {
                id: existingStream.thetaId!,
                stream_server: existingStream.stream_server,
                stream_key: existingStream.stream_key,
            };
        }
    }

    if (!createdStream) {
        notify.push({
            title: 'Error: Interracting with theta api',
            description: 'Please try again',
            category: 'error'
        });
        return;
    }

    const updatedStream = await ThurbeAPI.startStream(
        stream.value?.streamId!,
        createdStream.stream_server,
        createdStream.stream_key
    );

    if (!updatedStream) {
        notify.push({
            title: 'Error: Interracting with theta api',
            description: 'Please try again',
            category: 'error'
        });
        return;
    }

    if (stream.value?.streamType == StreamType.External) {
        streamConfigs.value = {
            open: true,
            data: {
                stream_server: createdStream.stream_server,
                stream_key: createdStream.stream_key,
                stream_reaction: `https://reactions.thurbe.xyz?id=${stream.value?.streamId!}`
            }
        };

        notify.push({
            title: 'Successful: Stream started',
            description: 'We have notified your followers',
            category: 'success'
        });

        return;
    }

    const videoStream = await Media.screenShare();

    if (!videoStream) {
        return;
    }

    const videoRecorder = new MediaRecorder(videoStream, {
        mimeType: 'video/webm; codecs=vp8'
    });

    videoRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
            socketAPI.emit('stream', {
                stream: event.data,
                url: `${createdStream.stream_server}/${createdStream.stream_key}`,
            });
        }
    };

    videoRecorder.start(100);

    notify.push({
        title: 'Successful: Stream started',
        description: 'We have notified your followers',
        category: 'success'
    });
};

const init = async () => {
    const cardId = await Contract.getCardId(
        (stream.value?.streamer as Account).address as `0x${string}`,
        false
    );

    const exclusiveCardId = await Contract.getCardId(
        (stream.value?.streamer as Account).address as `0x${string}`,
        true
    );

    if (walletStore.address) {
        if (cardId) {
            const cardBalance = await getNftBalance(cardId, walletStore.address);
            isFollow.value = cardBalance > 0;
        }

        if (exclusiveCardId) {
            const cardBalance = await getNftBalance(exclusiveCardId, walletStore.address);
            isSuperFollow.value = cardBalance > 0;
        }
    }

    if (stream.value?.viewerType == ViewerType.Everyone) {
        payable.value = true;
    }

    if (stream.value?.viewerType == ViewerType.Follower) {
        payable.value = isFollow.value || isSuperFollow.value;
    }

    if (stream.value?.viewerType == ViewerType.SuperFollower) {
        payable.value = isSuperFollow.value;
    }

    if (stream.value?.streamer == walletStore.address) {
        payable.value = true;
    }

    videoUrl.value = await ThetaAPI.getStreamUrl(stream.value?.thetaId!);

    if (payable.value && videoPlayer.value && videoUrl.value && stream.value?.live) {
        player = videojs(videoPlayer.value, {
            autoplay: true,
            controls: true,
            responsive: true,
            fluid: true,
            liveui: true,
            sources: [
                {
                    src: videoUrl.value,
                    type: 'application/x-mpegURL',
                    label: "auto"
                }
            ]
        });

        var customFullscreenButton = document.createElement('div');
        customFullscreenButton.classList.add('vjs-custom-fullscreen');

        var playerContainer = document.getElementsByClassName('video-js')[0];
        playerContainer.prepend(customFullscreenButton);

        customFullscreenButton.addEventListener('click', function () {
            // @ts-ignore
            document.getElementsByClassName('vjs-fullscreen-control')[0].click();
        });
    }

    loading.value = false;

    if (exclusiveCardId) {
        super_follow.value.amount = await Contract.getMintPrice(exclusiveCardId);
    }
};

const closeConfigs = () => {
    streamConfigs.value.open = false;
    refresh(false);
};

const isCreator = (): boolean => {
    return (stream.value?.streamer as Account)?.address == walletStore.address?.toLocaleLowerCase();
};


const refresh = async (isInit: boolean = true) => {
    if (isInit) {
        init();
    }

    const result = await ThurbeAPI.getStream(route.params.id as any);
    if (result) {
        stream.value = result;
    }
};

const stopStream = () => {
    ThurbeAPI.endStream(stream.value?.streamId!);
    if (player) {
        player.pause();
        player.currentTime(0);
    }
    refresh(false);
};

onMounted(() => {
    getStream();
});

onBeforeUnmount(() => {
    if (player) {
        player.dispose();
    }

    if (!isCreator() && payable.value) {
        ThurbeAPI.joinStream(
            walletStore.address || 'undefined',
            stream.value?.streamId!
        );
    }
});
</script>

<template>
    <div class="load_frame" v-if="loading">
        <ProgressBox />
    </div>

    <div class="detail_container" v-if="stream" v-show="!loading">
        <div class="detail_container_1">
            <div class="video_wrapper" :style="`background: url(${stream.thumbnail});`">
                <div class="restricted" v-if="!stream.live || !videoUrl">
                    <LockIcon />
                    <h3>Stream is not live or ended.</h3>
                    <p>{{ (stream.streamer as Account).name }} has scheduled this stream to {{
                        formatDate(stream.start_at) }}.</p>
                    <button @click="refresh(false)">
                        <p>Refresh</p>
                    </button>
                </div>
                <div class="restricted"
                    v-else-if="!isCreator() && stream.viewerType == ViewerType.SuperFollower && !isSuperFollow">
                    <LockIcon />
                    <h3>Oops, Sorry You are Ineligible to View this Content</h3>
                    <p>This channel owner only set this content to be to be viewable by Super followers only, Click the
                        button below to super follow.</p>
                    <button @click="super_follow.open = true">
                        <FlashIcon />
                        <p>Super Follow</p>
                    </button>
                </div>
                <div class="restricted"
                    v-else-if="!isCreator() && stream.viewerType == ViewerType.Follower && !(isFollow || isSuperFollow)">
                    <LockIcon />
                    <h3>Oops, Sorry You are Ineligible to View this Content</h3>
                    <p>This channel owner only set this content to be to be viewable by followers only, Click the
                        button below to follow.</p>
                    <button @click="follow">
                        <FlashIcon />
                        <p>Follow</p>
                    </button>
                </div>
                <video ref="videoPlayer" v-show="payable && stream.live" controls id="video-js" class="video-js"
                    :poster="stream.thumbnail || '/images/image_default.png'">
                    <track kind="chapters" src="chapters.vtt" srclang="en" label="" default>
                </video>
            </div>

            <div class="video_info control_panel" v-if="isCreator()">
                <div class="video_title">
                    <h3>{{ stream.name }}</h3>
                    <p>{{ formatDate(stream.created_at) }}</p>
                </div>

                <div class="video_reactions">
                    <div v-if="!stream.live">
                        <div class="video_reaction start_stream" v-if="stream.streamType == StreamType.External"
                            @click="startStream">
                            <ConfigIcon />
                            <p>Live Configs</p>
                        </div>
                        <div class="video_reaction start_stream" v-if="stream.streamType == StreamType.Direct"
                            @click="startStream">
                            <MicIcon />
                            <p>Start Sharing</p>
                        </div>
                    </div>
                    <div v-else>
                        <div class="video_reaction start_stream" @click="stopStream">
                            <MicIcon />
                            <p>End Stream</p>
                        </div>
                    </div>

                    <div class="video_reaction" @click="micToggle">
                        <MicIcon :active="stream.likes.includes(walletStore.address?.toLocaleLowerCase() || '')" />
                    </div>
                    <div class="video_reaction" @click="reacts = !reacts">
                        <EmojiIcon />
                        <div class="video_reaction_panel" v-show="reacts">
                            <p @click="react('😂')">😂</p>
                            <p @click="react('🔥')">🔥</p>
                            <p @click="react('❤️‍🔥')">❤️‍🔥</p>
                            <p @click="react('😡')">😡</p>
                            <p @click="react('😭')">😭</p>
                        </div>
                    </div>
                    <div class="video_reaction">
                        <ShareIcon />
                    </div>
                </div>
            </div>

            <div class="video_info" v-else>
                <div class="video_title">
                    <h3>{{ stream.name }}</h3>
                    <p>{{ formatDate(stream.created_at) }}</p>
                </div>

                <div class="video_reactions">
                    <div class="video_reaction" @click="reacts = !reacts">
                        <EmojiIcon />
                        <div class="video_reaction_panel" v-show="reacts">
                            <p @click="react('😂')">😂</p>
                            <p @click="react('🔥')">🔥</p>
                            <p @click="react('❤️‍🔥')">❤️‍🔥</p>
                            <p @click="react('😡')">😡</p>
                            <p @click="react('😭')">😭</p>
                        </div>
                    </div>
                    <div class="video_reaction" @click="like">
                        <LikeIcon :active="stream.likes.includes(walletStore.address?.toLocaleLowerCase() || '')" />
                    </div>
                    <div class="video_reaction" @click="dislike">
                        <DislikeIcon
                            :active="stream.dislikes.includes(walletStore.address?.toLocaleLowerCase() || '')" />
                    </div>
                    <div class="video_reaction">
                        <ShareIcon />
                    </div>
                </div>
            </div>

            <div class="creator">
                <div class="creator_info">
                    <img :src="(stream.streamer as Account).channel?.image" alt="">
                    <div class="creator_name">
                        <h3>{{ (stream.streamer as Account).channel?.name }}</h3>
                        <p><span>{{ (stream.streamer as Account).followers.length }}</span> Followers</p>
                    </div>
                </div>

                <div class="creator_follows" v-if="!isCreator()">
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

                    <button v-else-if="!isFollow" @click="follow">
                        <UserAddIcon />
                        <p>Follow</p>
                    </button>

                    <button v-if="!isSuperFollow" @click="super_follow.open = true">
                        <FlashIcon />
                    </button>
                </div>
            </div>

            <div class="video_contents">
                <div class="video_contents_stats">
                    <div class="video_contents_stat">
                        <div class="video_contents_stat_icon">
                            <UserGroupIcon />
                        </div>
                        <div class="video_contents_stat_text">
                            <p>Viewers</p>
                            <h3>{{ stream.viewers.length }}</h3>
                        </div>
                    </div>

                    <div class="video_contents_stat">
                        <div class="video_contents_stat_icon">
                            <LikeIcon />
                        </div>
                        <div class="video_contents_stat_text">
                            <p>Likes</p>
                            <h3>{{ stream.likes.length }}</h3>
                        </div>
                    </div>

                    <div class="video_contents_stat">
                        <div class="video_contents_stat_icon">
                            <CalendarIcon />
                        </div>
                        <div class="video_contents_stat_text">
                            <p>Posted On</p>
                            <h3>{{ Converter.fullMonth(
                                new Date(stream.created_at)
                            ) }}
                            </h3>
                        </div>
                    </div>
                </div>

                <div class="video_contents_desc">
                    <p>{{ stream.description || 'No description' }}</p>
                </div>
            </div>
        </div>
        <div class="detail_container_2">
            <div class="comment_container">
                <div class="comment_header">
                    <div class="comment_header_text">
                        <h3>Chats</h3>
                        <p>{{ chats.length }}</p>
                    </div>

                    <button class="comment_header_icon">
                        <SortIcon />
                    </button>
                </div>

                <div class="comment_list">
                    <div class="comment" v-for="chat, index in chats" :key="index">
                        <p class="comment_name"><span>{{ chat.from.name }}</span>

                            {{ formatDate((chat.timestamp as any).seconds * 1000) }}</p>
                        <p class="comment_text">{{ chat.text }}</p>
                        <div class="comment_tipped" v-if="chat.tip.amount > 0">
                            <p>Tipped</p>
                            <div class="comment_tip_amount">
                                <img src="/images/logo.png" alt="">
                                <p><span>{{ chat.tip.amount }}</span> THUB</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tipping" v-if="(tip.amount || 0) > 0">
                    <div class="comment_tipping">
                        <p>Tipping</p>
                        <div class="comment_tipping_amount">
                            <img src="/images/logo.png" alt="">
                            <p><span>{{ tip.amount }}</span> THUB</p>
                            <EditIcon @click="tip.open = true" style="cursor: pointer;" />
                            <CloseIcon @click="tip.amount = undefined" style="cursor: pointer;" />
                        </div>
                    </div>
                </div>

                <div class="comment_send">
                    <div class="comment_input">
                        <input type="text" v-model="text" placeholder="Type your comment.." />
                        <SmileIcon />
                    </div>

                    <div class="comment_react">
                        <div class="comment_tip" v-if="stream.tips" @click="tip.open = true">
                            <CoinsDollarIcon />
                        </div>
                        <div v-else></div>

                        <button @click="sendComment">
                            <SendIcon />
                            <p>{{ commenting ? 'Sending..' : 'Comment' }}</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <SendTip :channel="(stream.streamer as Account).channel!" v-if="tip.open" @close="tip.open = false"
            @continue="setTip" />
        <SuperFollow :channel="(stream.streamer as Account).channel!" :amount="super_follow.amount"
            v-if="super_follow.open" @close="super_follow.open = false" @continue="superFollow" />
        <StreamConfigs v-if="streamConfigs.open" @close="closeConfigs" :configs="streamConfigs.data" />
    </div>
</template>

<style scoped>
.detail_container {
    display: grid;
    grid-template-columns: 650px 340px;
    gap: 30px;
    justify-content: center;
    margin-top: 60px;
}

.video_wrapper {
    width: 100%;
    height: 326px;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
}

.video_wrapper video {
    width: 100%;
}

.restricted {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    backdrop-filter: blur(6px);
    background: rgba(115, 115, 115, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    padding: 30px;
    z-index: 1;
}

.restricted h3 {
    font-size: 14px;
    font-weight: 600;
    line-height: 21px;
    color: var(--bg);
    margin-top: 20px;
}

.restricted>p {
    margin-top: 10px;
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    color: rgba(255, 255, 255, 0.8);
    width: 327px;
    max-width: 100%;
}

.restricted button {
    margin-top: 30px;
    width: 172px;
    height: 40px;
    gap: 12px;
    border-radius: 6px;
    background: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
}

.restricted button p {
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    color: var(--bg);
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
    position: relative;
}

.start_stream {
    width: unset;
    padding: 20px;
    gap: 10px;
}

.start_stream p {
    font-size: 14px;
    font-weight: 500;
    color: var(--tx-normal);
}

.video_reaction_panel {
    position: absolute;
    display: flex;
    align-items: center;
    gap: 10px;
    height: 60px;
    padding: 0 16px;
    border: 1px solid var(--bg-darker);
    background: var(--bg);
    border-radius: 6px;
    z-index: 1;
    top: 40px;
    box-shadow: 0 4px 4px var(--tx-dimmed);
}

.video_reaction_panel p {
    cursor: pointer;
    font-size: 30px;
    user-select: none;
}

.video_reaction_panel p:hover {
    transform: scale(1.2, 1.2);
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
    object-fit: cover
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

.creator_follows {
    display: flex;
    align-items: center;
    gap: 20px;
}

.creator_follows button:first-child {
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

.creator_follows button:first-child p {
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    color: var(--tx-normal);
}

.creator_follows button:last-child {
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

.creator_follow_icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-darkest);
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

.comment_container {
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    position: sticky;
    top: 150px;
}

.comment_header {
    background: var(--bg-darker);
    padding: 30px 30px 24px 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--bg);
}

.comment_header_text h3 {
    font-size: 14px;
    font-weight: 600;
    line-height: 14px;
    color: var(--tx-normal);
}

.comment_header_text p {
    margin-top: 6px;
    font-size: 12px;
    font-weight: 500;
    line-height: 14.4px;
    color: var(--tx-dimmed);
}

.comment_header_icon {
    width: 40px;
    height: 40px;
    border-radius: 6px;
    background: var(--bg);
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
}

.comment_send {
    padding: 20px;
    background: var(--bg-darkest);
}

.comment_input {
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    gap: 12px;
    border-radius: 6px;
    border: 1px solid var(--tx-dimmed);
    background: var(--bg);
    padding: 0 12px;
}

.comment_input input {
    font-size: 12px;
    font-weight: 500;
    color: var(--tx-normal);
    border: none;
    outline: none;
    width: 100%;
}

.comment_input input::placeholder {
    color: var(--tx-dimmed);
}

.comment_list {
    background: var(--bg-dark);
    overflow: auto;
    height: 500px;
}

.comment {
    padding-top: 16px;
    background: var(--bg-dark);
    border-bottom: 1px solid var(--bg-darker);
}

.comment .comment_name {
    font-size: 12px;
    font-weight: 500;
    line-height: 12px;
    color: var(--tx-dimmed);
    padding: 0 24px;
}

.comment .comment_name span {
    margin-right: 10px;
    color: var(--tx-normal);
}

.comment .comment_text {
    margin: 10px 0 16px 0;
    font-size: 12px;
    font-weight: 500;
    line-height: 12px;
    color: var(--tx-semi);
    padding: 0 24px;
}

.comment .comment_tipped {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--bg-darker);
    padding: 0 24px;
    height: 48px;
}

.comment_tipped>p {
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    color: var(--tx-semi);
}

.comment .comment_tip_amount {
    display: flex;
    align-items: center;
    gap: 10px;
}

.comment .comment_tip_amount img {
    width: 16px;
    height: 16px;
    border-radius: 4px;
}

.comment .comment_tip_amount p {
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    color: var(--tx-semi);
}

.comment .comment_tip_amount p span {
    color: var(--tx-normal);
}

.comment_tipping {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--bg-darker);
    padding: 0 24px;
    height: 48px;
    border-top: 1px solid var(--bg);
}

.comment_tipping>p {
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    color: var(--tx-semi);
}

.comment_tipping_amount {
    display: flex;
    align-items: center;
    gap: 10px;
}

.comment_tipping_amount img {
    width: 16px;
    height: 16px;
    border-radius: 4px;
}

.comment_tipping_amount p {
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    color: var(--tx-semi);
}

.comment_tipping_amount p span {
    color: var(--tx-normal);
}

.comment_react {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 16px;
}

.comment_tip {
    width: 40px;
    height: 40px;
    border-radius: 6px;
    background: var(--bg);
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
}

.comment_react button {
    width: 150px;
    height: 40px;
    gap: 12px;
    border-radius: 6px;
    background: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
}

.comment_react button p {
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    color: var(--bg);
}
</style>