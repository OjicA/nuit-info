import { createWebHashHistory, createRouter } from 'vue-router'

const routes = [
  { name: 'home', path: '/', component: () => import('../components/Human.vue') },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
