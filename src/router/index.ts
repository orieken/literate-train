import { createRouter, createWebHistory } from 'vue-router'
import PatternWorkspace from '../views/PatternWorkspace.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'workspace',
      component: PatternWorkspace,
    },
  ],
})

export default router
