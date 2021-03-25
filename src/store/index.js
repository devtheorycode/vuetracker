import { createStore, createLogger } from 'vuex'

const store = createStore({
  state () {
    return {
      count: 5,
      totalReset: 0
    }
  },
  mutations: {
    SET_COUNT (state, value) {
      state.count = value
    },
    INCREMENT_COUNT (state) {
      state.count++
    },
    INCREMENT_TOTAL_RESET (state) {
      state.totalReset++
    }
  },
  actions: {

    resetCount ({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('SET_COUNT', 0)
          commit('INCREMENT_TOTAL_RESET')
          resolve()
        }, 2000)
      })
    }

  },
  plugins: import.meta.env.MODE !== 'production' ? [createLogger()] : []
})

export default store
