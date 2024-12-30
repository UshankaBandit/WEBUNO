import { createRouter, createWebHistory } from 'vue-router';
import GameSetupView from '@/Views/GameSetupView.vue';
import PlayHandView from '@/Views/PlayHandView.vue';
import GameStateView from '@/Views/GameStateView.vue';
import GameOverView from '@/Views/GameOverview.vue';

const routes = [
  { path: '/', component: GameSetupView },
  { path: '/play', component: PlayHandView },
  { path: '/state', component: GameStateView },
  { path: '/gameover', component: GameOverView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;