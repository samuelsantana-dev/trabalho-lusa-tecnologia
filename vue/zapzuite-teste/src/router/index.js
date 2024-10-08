import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/lembretes',
      name: 'lembretes',
      component: () => import('../views/Lembretes.vue')
    },
    {
      path: '/agendar',
      name: 'agendar',
      component: () => import('../views/Agendar.vue')
    }
  ]
})

export default router
