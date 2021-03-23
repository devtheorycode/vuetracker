import { createApp } from 'vue'
import * as VueRouter from 'vue-router'

import App from './App.vue'
import HomePage from './pages/Home.vue'

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

const LoginPage = () => import('./pages/Login.vue')
const NotFoundPage = () => import('./pages/NotFound.vue')
const SettingsPage = () => import('./pages/Settings.vue')
const SettingsApp = () => import('./components/SettingsApp.vue')
const SettingsUser = () => import('./components/SettingsUser.vue')

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: [
    {
      path: '/',
      alias: '/home',
      name: 'Home',
      component: HomePage,
      meta: { needJsonBin: true },
      children: [
        {
          path: 'home/:taskID',
          component: HomePage
        }
      ]
    },
    {
      path: '/settings',
      name: 'Settings',
      component: SettingsPage,
      meta: { needJsonBin: true },
      children: [
        {
          path: 'app',
          component: SettingsApp,
          meta: { needJsonBin: false }
        },
        {
          path: 'user',
          component: SettingsUser,
          meta: { needJsonBin: true }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage,
      beforeEnter: (to, from) => {
        if (localStorage.getItem('jsonBinAccess')) {
          return '/'
        }
      }
    },
    {
      path: '/notfound',
      name: 'NotFound',
      component: NotFoundPage
    },
    {
      path: '/:wrongPath(.*)',
      redirect: (to) => {
        return { name: 'NotFound', params: { wrongPath: to.params.wrongPath } }
      }
    }
  ]
})

router.beforeEach((to, from) => {
  /* global localStorage */
  if (to.meta.needJsonBin && !localStorage.getItem('jsonBinAccess')) {
    return '/settings/app'
  }
})

const app = createApp(App)

app.use(router)
app.use(ElementPlus)

app.mount('#app')
