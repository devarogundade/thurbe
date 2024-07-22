<script setup lang="ts">
import ThurbeLogo from '@/components/icons/ThurbeLogo.vue';
import { ref, onMounted } from 'vue';
import SocketAPI from '@/scripts/socket-api';
import type { Channel } from '@/types';
import ThurbeAPI from '@/scripts/thurbe-api';

const socketAPI = new SocketAPI();

type Chat = {
  channelId: string,
  text: string;
  from: {
    name: string;
    address: string;
    image: string | null;
  };
  tip: {
    amount: number;
  },
  timestamp: Date;
};

interface Box {
  id: number;
  styles: {
    '--random-x1': string;
    '--random-x2': string;
    '--random-x3': string;
  };
  chat?: Chat;
  emoji?: string;
  type: 'chat' | 'reaction';
}

const boxes = ref<Box[]>([]);
const channel = ref<Channel | null>(null);

const getRandomInt = (min: number, max: number): string => {
  return `${Math.floor(Math.random() * (max - min + 1)) + min}vw`;
};

const createBox = (id: number, type: 'chat' | 'reaction', chat?: Chat, emoji?: string): Box => {
  return {
    id,
    styles: {
      '--random-x1': getRandomInt(-5, 10),
      '--random-x2': getRandomInt(-5, 15),
      '--random-x3': getRandomInt(-5, 20),
    },
    chat,
    emoji,
    type
  };
};

const removeBox = (id: number) => {
  boxes.value.splice(boxes.value.findIndex((box) => box.id = id), 1);
};

const newChatBox = (chat: Chat) => {
  // Create multiple boxes
  const box = createBox(boxes.value.length, 'chat', chat, undefined);

  boxes.value.push(box);
};

const newReactBox = (emoji: string) => {
  // Create multiple boxes
  const box = createBox(boxes.value.length, 'reaction', undefined, emoji);
  boxes.value.push(box);
};

const channelId = new URLSearchParams(window.location.search).get('id');

const getStreamer = async () => {
  if (channelId) {
    channel.value = (await ThurbeAPI.getStream(channelId))?.streamer.channel || null;
  }
};

onMounted(() => {
  socketAPI.on(`channel-${channelId}-chat`, (data: Chat) => {
    newChatBox(data);
  });

  socketAPI.on(`channel-${channelId}-reaction`, (data: any) => {
    newReactBox(data.emoji);
  });

  getStreamer();
});
</script>

<template>
  <main>
    <section class="header_section">
      <div class="app_width">
        <header>
          <div class="logo">
            <ThurbeLogo />
            <p>|</p>
            <p>Reactions</p>
          </div>

          <div class="streamer" v-if="channel">
            <p>{{ channel.name }}</p>
            <img :src="channel.image || '/images/image_default.png'" alt="">
          </div>
        </header>
      </div>
    </section>

    <section class="reaction_section">
      <div class="app_width">
        <div class="reactions">
          <div v-for="box, index in boxes" :key="index" :class="`gift-box gift-box-${box.id} animated`"
            :style="{ ...box.styles, background: `url('${box.type == 'chat' ? box.chat!.tip.amount > 0 ? '/images/gift_2.png' : '/images/comment_2.png' : 'none'}') no-repeat center/contain` }"
            @animationend="removeBox(box.id)">
            <div class="user" v-if="box.type == 'chat'">
              <img :src="box.chat!.from.image || '/images/image_default.png'" alt="">
              <p>{{ box.chat!.from.name }}</p>
            </div>
            <div class="text" v-if="box.type == 'chat'">{{ box.chat!.text }}</div>
            <div class="value" v-if="box.type == 'chat' && box.chat!.tip.amount > 0">
              <p>+{{ box.chat!.tip.amount }}</p>
              <img src="/images/logo.png" alt="">
            </div>
            <div class="emoji" v-if="box.type == 'reaction'">{{ box.emoji }}</div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
main {
  background: rgba(255, 255, 255, 0.4);
  padding: 10px;
  border-radius: 12px;
  overflow: hidden;
}

.header_section {
  overflow: hidden;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
}

header {
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  height: 90px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.logo p {
  font-size: 24px;
  margin-top: 4px;
  color: var(--tx-normal);
}

.streamer {
  display: flex;
  align-items: center;
  gap: 20px;
}

.streamer p {
  font-size: 24px;
  margin-top: 4px;
  color: var(--tx-normal);
  max-width: 120px;
  text-wrap: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.streamer img {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  object-fit: cover;
}

.reaction_section {
  min-height: 500px;
}

.reactions {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
}

.gift-box {
  width: 120px;
  height: 120px;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  gap: 10px;
  text-align: center;
}

.value {
  font-size: 16px;
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  gap: 4px;
}

.value p {
  margin-top: 3px;
}

.value img {
  width: 18px;
  height: 18px;
  border-radius: 10px;
}

.user {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user img {
  width: 24px;
  height: 24px;
  border-radius: 20px;
  object-fit: cover;
}

.user p {
  font-weight: 500;
  font-size: 12px;
  color: var(--tx-normal);
}

.text {
  width: 200px;
  font-weight: 500;
  font-size: 14px;
  color: var(--primary);
}

.emoji {
  font-size: 50px;
}

@keyframes moveUp {
  0% {
    transform: translateY(0) translateX(0);
    opacity: 1;
  }

  25% {
    transform: translateY(-25vh) translateX(var(--random-x1));
    opacity: 0.75;
  }

  50% {
    transform: translateY(-50vh) translateX(var(--random-x2));
    opacity: 0.5;
  }

  75% {
    transform: translateY(-75vh) translateX(var(--random-x3));
    opacity: 0.25;
  }

  100% {
    transform: translateY(-100vh) translateX(0);
    opacity: 0;
  }
}

.animated {
  animation: moveUp 5s linear forwards;
}
</style>
