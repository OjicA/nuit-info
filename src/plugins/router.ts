import { createWebHashHistory, createRouter } from 'vue-router'

const routes = [
  {
    name: 'human',
    path: '/',
    component: () => import('@/components/Human/Human.vue')
  },
  {
    name: 'input',
    path: '/input',
    component: () => import('@/components/FormRelou.vue')
  },
  {
    name: 'captcha',
    path: '/captcha',
    // @ts-expect-error
    component: () => import('@/components/Captcha.vue')
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
