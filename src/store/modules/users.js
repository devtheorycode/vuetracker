/* global localStorage */
import * as FirebaseService from '../../services/FirebaseService.js'

let userInStorage
try {
  userInStorage = JSON.parse(localStorage.getItem('currentUser') || null)
} catch (e) {
  userInStorage = null
}

export default {
  namespaced: true,
  state () {
    return {
      currentUser: userInStorage
    }
  },
  mutations: {
    SET_CURRENT_USER (state, user) {
      state.currentUser = user
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user))
      } else {
        localStorage.removeItem('currentUser')
      }
    }
  },
  actions: {

    async register ({ commit }, { email, password }) {
      const [res, errorCode] = await FirebaseService.register(email, password)
      if (errorCode) {
        return FirebaseService.translateErrorCode(errorCode)
      } else {
        commit('SET_CURRENT_USER', res.user)
        return true
      }
    },

    async login ({ commit }, { email, password }) {
      const [res, errorCode] = await FirebaseService.login(email, password)
      if (errorCode) {
        return FirebaseService.translateErrorCode(errorCode)
      } else {
        commit('SET_CURRENT_USER', res.user)
        return true
      }
    },

    setWatcherCurrentUser ({ commit }) {
      FirebaseService.Auth.onAuthStateChanged((user) => {
        commit('SET_CURRENT_USER', user)
      })
    }

  }
}
