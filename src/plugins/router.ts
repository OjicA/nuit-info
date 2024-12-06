import { createWebHashHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../components/FormRelou.vue') },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
