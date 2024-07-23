import { createRouter, createWebHistory } from 'vue-router';
import ExploreView from '@/views/explore/ExploreView.vue';
import ExploreVideos from '@/views/explore/ExploreVideos.vue';
import ExploreStreams from '@/views/explore/ExploreStreams.vue';
import ExploreChannels from '@/views/explore/ExploreChannels.vue';
import SignInView from '@/views/signin/SignInView.vue';
import HomeView from '@/HomeView.vue';
import AppView from '@/AppView.vue';
import ChannelView from '@/views/channel/ChannelView.vue';
import ChannelVideos from '@/views/channel/ChannelVideos.vue';
import ChannelStreams from '@/views/channel/ChannelStreams.vue';
import PortfolioView from '@/views/portfolio/PortfolioView.vue';
import AIView from '@/views/ai/AIView.vue';
import PortfolioVideos from '@/views/portfolio/PortfolioVideos.vue';
import PortfolioStreams from '@/views/portfolio/PortfolioStreams.vue';
import PortfolioRevenue from '@/views/portfolio/PortfolioRevenue.vue';
import PortfolioSettings from '@/views/portfolio/PortfolioSettings.vue';
import GoLive from '@/views/create/GoLive.vue';
import UploadVideo from '@/views/create/UploadVideo.vue';
import CreateView from '@/views/create/CreateView.vue';
import VideoDetail from '@/views/explore/details/VideoDetail.vue';
import StreamDetail from '@/views/explore/details/StreamDetail.vue';
import ThumbnailAI from '@/views/ai/ThumbnailAI.vue';

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
      children: [
        {
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
            }],
        },
        {
          path: '/videos/:id',
          name: 'explore-videos-video',
          component: VideoDetail
        },
        {
          path: '/streams/:id',
          name: 'explore-streams-stream',
          component: StreamDetail
        },
        {
          path: '/portfolio',
          name: 'portfolio',
          component: PortfolioView,
          children: [
            {
              path: '/portfolio',
              name: 'portfolio-videos',
              component: PortfolioVideos
            },
            {
              path: '/portfolio/streams',
              name: 'portfolio-streams',
              component: PortfolioStreams
            },
            {
              path: '/portfolio/revenue',
              name: 'portfolio-revenue',
              component: PortfolioRevenue
            }]
        },
        {
          path: '/ai',
          name: 'ai',
          component: AIView,
          children: [{
            path: '/ai',
            name: 'ai-thumbnail',
            component: ThumbnailAI,
          }]
        },
        {
          path: '/channels/:id',
          name: 'explore-channels-channel',
          component: ChannelView,
          children: [
            {
              path: '/channels/:id',
              name: 'explore-channels-channel-videos',
              component: ChannelVideos
            },
            {
              path: '/channels/:id/streams',
              name: 'explore-channels-channel-streams',
              component: ChannelStreams
            }
          ]
        },
        {
          name: 'create',
          path: '/create',
          component: CreateView,
          children: [
            {
              name: 'create-video',
              path: '/create',
              component: UploadVideo
            },
            {
              name: 'create-stream',
              path: '/create/stream',
              component: GoLive
            }
          ]
        },
        {
          name: 'portfolio-settings',
          path: '/portfolio/settings',
          component: PortfolioSettings
        }
      ]
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
