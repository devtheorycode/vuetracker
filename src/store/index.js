import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      count: 5
    }
  }
})

export default store
