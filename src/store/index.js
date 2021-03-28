import { createStore, createLogger } from 'vuex'
import TasksModule from './modules/tasks.js'

const store = createStore({
  modules: {
    tasks: TasksModule
  },
  plugins: import.meta.env.MODE !== 'production' ? [createLogger()] : []
})

export default store
