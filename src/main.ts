import Aura from '@primevue/themes/aura'
import PrimeVue from 'primevue/config'
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './plugins/router'

createApp(App)
  .use(router)
  .use(PrimeVue, {
    theme: {
      preset: Aura
    }
  })
  .mount('#app')
