import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue'

const router = createRouter({
   history: createWebHashHistory("/smart-dashboard/"),
  routes: [
    {
      path: '/',
      name: 'home',
       component: () => import('@/dashboard/dashboard.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/dashboard/dashboard.vue'),
    },
  ],
})

export default router
