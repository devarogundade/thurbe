import { createRouter, createWebHistory } from 'vue-router';
import ExploreView from '@/views/explore/ExploreView.vue';
import ExploreVideos from '@/views/explore/ExploreVideos.vue';
import ExploreStreams from '@/views/explore/ExploreStreams.vue';
import ExploreChannels from '@/views/explore/ExploreChannels.vue';
import SignInView from '@/views/signin/SignInView.vue';
import HomeView from '@/HomeView.vue';
import AppView from '@/AppView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
  routes: [
    {
      path: '/',
      name: 'explore',
      component: AppView,
      children: [{
        path: '/',
        name: 'explore',
        component: ExploreView,
        children: [
          {
            path: '/',
            name: 'explore-videos',
            component: ExploreVideos
          },
          {
            path: '/streams',
            name: 'explore-streams',
            component: ExploreStreams
          },
          {
            path: '/channels',
            name: 'explore-channels',
            component: ExploreChannels
          }]
      }]
    },
    {
      path: '/signin',
      name: 'signin',
      component: HomeView,
      children: [
        {
          path: '/signin',
          name: 'signin',
          component: SignInView,
        }
      ]
    }
  ]
});

export default router;
