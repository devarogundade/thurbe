import { createRouter, createWebHistory } from 'vue-router';
import DiscoverView from '@/views/discover/DiscoverView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'discover',
      component: DiscoverView
    }
  ]
});

export default router;
