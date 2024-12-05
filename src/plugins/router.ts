import { createWebHashHistory, createRouter } from 'vue-router'

const routes = [
  { name: 'home', path: '/', component: () => import('@/components/Human/Human.vue') },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
