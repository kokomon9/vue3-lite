import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia';
import routes from 'virtual:generated-pages'
import App from './App.vue'
import './assets/css/style.css'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
const pinia = createPinia();
app.use(pinia)
app.use(router)
app.mount('#app')
