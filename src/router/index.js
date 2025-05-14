import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const routes = [
  { 
    path: '/', 
    name: 'home',
    component: HomeView 
  },
  {
    path: '/add',
    name: 'add',
    component: HomeView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;