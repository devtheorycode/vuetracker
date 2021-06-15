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
      component: LoginPage
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterPage
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

// Mise en place de la vérification pour chasue route
// router.beforeEach((to, from) => {
//   /* global localStorage */
//   if (to.meta.needJsonBin && !localStorage.getItem('jsonBinAccess')) {
//     return '/settings/app'
//   }
// })

// Exportation du router
export default router
