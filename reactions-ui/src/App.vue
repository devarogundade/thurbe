<script setup lang="ts">
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
</script>

<template>
  <section>
    <div class="app_width">
      <main>
        <h3>Reactions</h3>
      </main>
    </div>
  </section>
</template>

<style scoped>
.main {
  padding: 40px 0;
  background: var(255, 255, 255, 0.1);
  backdrop-filter: blur(3px);
}

h3 {
  font-size: 40px;
  color: var(--tx-normal);
}
</style>
