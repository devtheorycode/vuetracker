import * as FirebaseService from '../../services/FirebaseService.js'

export default {
  namespaced: true,
  state () {
    return {
      currentUser: null
    }
  },
  mutations: {
    SET_CURRENT_USER (state, user) {
      state.currentUser = user
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
    }

  }
}
