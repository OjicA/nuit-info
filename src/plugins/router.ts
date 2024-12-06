import { createWebHashHistory, createRouter } from 'vue-router'

const routes = [
  {
    name: 'human',
    path: '/',
    component: () => import('@/components/Human/Human.vue')
  },
  {
    name: 'organ',
    path: '/:organ',
    component: () => import('@/components/Human/OrganDetail.vue')
  }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
