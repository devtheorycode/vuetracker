import * as VueRouter from 'vue-router'

// Pages
import HomePage from '../pages/Home.vue'
const LoginPage = () => import('../pages/Login.vue')
const RegisterPage = () => import('../pages/Register.vue')
const NotFoundPage = () => import('../pages/NotFound.vue')
const SettingsPage = () => import('../pages/Settings.vue')
const SettingsApp = () => import('../components/SettingsApp.vue')
const SettingsUser = () => import('../components/SettingsUser.vue')

// Création du router
const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: [
    {
      path: '/',
      alias: '/home',
      name: 'Home',
      component: HomePage,
      meta: { layout: true },
      beforeEnter: [checkLoggedIn, checkJsonBinAccess],
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
      meta: { layout: true },
      beforeEnter: [checkLoggedIn],
      children: [
        {
          path: 'app',
          component: SettingsApp
        },
        {
          path: 'user',
          component: SettingsUser
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      meta: { layout: false },
      beforeEnter: [checkNotLoggedIn],
      component: LoginPage
    },
    {
      path: '/register',
      name: 'Register',
      meta: { layout: false },
      beforeEnter: [checkNotLoggedIn],
      component: RegisterPage
    },
    {
      path: '/notfound',
      name: 'NotFound',
      meta: { layout: false },
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

/* global localStorage */

function checkLoggedIn () {
  if (!localStorage.getItem('currentUser')) {
    return '/login'
  }
}

function checkNotLoggedIn () {
  if (localStorage.getItem('currentUser')) {
    return '/'
  }
}

function checkJsonBinAccess () {
  if (!localStorage.getItem('jsonBinAccess')) {
    return '/settings/app'
  }
}

// Exportation du router
export default router
