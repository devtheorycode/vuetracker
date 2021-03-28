import { createStore, createLogger } from 'vuex'
import TasksModule from './modules/tasks.js'
import NotificationsModule from './modules/notifications.js'

const store = createStore({
  modules: {
    tasks: TasksModule,
    notifications: NotificationsModule
  },
  plugins: import.meta.env.MODE !== 'production' ? [createLogger()] : []
})

export default store
