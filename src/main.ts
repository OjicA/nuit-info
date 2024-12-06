import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Vue-Plugin
import router from './plugins/router'

// PrimeVue
import PrimeVue from 'primevue/config'
import primeVueConfig from './plugins/prime-vue'

createApp(App)
  .use(router)
  .use(PrimeVue, primeVueConfig)
  .mount('#app')
