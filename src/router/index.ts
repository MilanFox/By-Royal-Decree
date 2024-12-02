import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), routes: [
    { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
    { path: '/level/:id', name: 'level', component: () => import('../views/GameView.vue') },
    { path: '/settings', name: 'settings', component: () => import('../views/SettingsView.vue') },
  ],
});

export default router;
