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
      meta: { needLoggedIn: false },
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
      meta: { needLoggedIn: false },
      children: [
        {
          path: 'app',
          component: SettingsApp,
          meta: { needLoggedIn: false }
        },
        {
          path: 'user',
          component: SettingsUser,
          meta: { needLoggedIn: false }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage,
      beforeEnter: (to, from) => {
        if (localStorage.getItem('isLoggedIn')) {
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
  if (to.meta.needLoggedIn && !localStorage.getItem('isLoggedIn')) {
    return '/login'
  }
})

const app = createApp(App)

app.use(router)
app.use(ElementPlus)

app.mount('#app')
