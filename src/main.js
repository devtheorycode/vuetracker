import { createApp } from 'vue'
import * as VueRouter from 'vue-router'

import App from './App.vue'
import HomePage from './pages/Home.vue'
import SettingsPage from './pages/Settings.vue'

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/settings',
      name: 'Settings',
      component: SettingsPage
    }
  ]
})

const app = createApp(App)

app.use(router)
app.use(ElementPlus)

app.mount('#app')
