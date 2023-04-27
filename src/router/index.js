// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/components/Login.vue'),
    children: [
      {
        path: '',
        name: 'Login'
      }
    ]
  },
  {
    path: '/patients',
    component: () => import('@/components/patients/List.vue'),
    children: [
      {
        path: '/patients',
        name: 'patients'
      }
    ]

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
