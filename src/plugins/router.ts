import { createWebHashHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../components/HelloWorld.vue') },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
