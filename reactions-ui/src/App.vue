<script setup lang="ts">
import ThurbeLogo from '@/components/icons/ThurbeLogo.vue';
import { ref, onMounted } from 'vue';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FS_API_KEY,
  authDomain: import.meta.env.VITE_FS_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FS_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FS_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FS_MSG_SENDER_ID,
  appId: import.meta.env.VITE_FS_APP_ID,
  measurementId: import.meta.env.VITE_FS_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

getAnalytics(app);

const listenToChats = () => {

};

const listenToTips = () => {

};

interface Box {
  id: number;
  styles: {
    '--random-x1': string;
    '--random-x2': string;
    '--random-x3': string;
  };
}

const boxes = ref<Box[]>([]);

const getRandomInt = (min: number, max: number): string => {
  return `${Math.floor(Math.random() * (max - min + 1)) + min}vw`;
};

const createBox = (id: number): Box => {
  return {
    id,
    styles: {
      '--random-x1': getRandomInt(-5, 10),
      '--random-x2': getRandomInt(-5, 15),
      '--random-x3': getRandomInt(-5, 20),
    },
  };
};

const removeBox = (index: number) => {
  boxes.value.splice(index, 1);
};

const newBox = (id: number) => {
  // Create multiple boxes
  const box = createBox(id);

  boxes.value.push(box);

  // Add animation class after styles are applied
  setTimeout(() => {
    const boxElement = document.getElementsByClassName(`gift-box-${box.id}`)[0];
    boxElement.classList.add('animated');
  }, 100);
};

onMounted(() => {
  let index = 1;
  setInterval(() => { newBox(index); index++; }, 1000);
});
</script>

<template>
  <section class="header_section">
    <div class="app_width">
      <header>
        <div class="logo">
          <ThurbeLogo />
          <p>|</p>
          <p>Reactions</p>
        </div>

        <div class="streamer">
          <p>The CartoonistGuy</p>
          <img src="/images/game.png" alt="">
        </div>
      </header>
    </div>
  </section>

  <section class="reaction_section">
    <div class="app_width">
      <div class="reactions">
        <div v-for="(box, index) in boxes" :key="box.id" :class="`gift-box gift-box-${box.id}`" :style="box.styles"
          @animationend="removeBox(index)">
          <div class="value">
            <p>+2.354</p>
            <img src="/images/theta.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
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
}

.streamer img {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  object-fit: cover;
}

.reaction_section {
  background: rgba(0, 0, 0, 0.1);
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
  background: url('/images/gift_1.png') no-repeat center/contain;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
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
