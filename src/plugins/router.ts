import { createWebHashHistory, createRouter } from 'vue-router'

const routes = [
  { name: 'home', path: '/', component: () => import('../components/HelloWorld.vue') },
  {
    path: "/captcha",
    name: "Captcha",
    component: () => import('../components/captcha.vue'),
  },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
