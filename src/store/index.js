import { createStore, createLogger } from 'vuex'
import UsersModule from './modules/users.js'
import TasksModule from './modules/tasks.js'
import NotificationsModule from './modules/notifications.js'

const store = createStore({
  modules: {
    users: UsersModule,
    tasks: TasksModule,
    notifications: NotificationsModule
  },
  plugins: import.meta.env.MODE !== 'production' ? [createLogger()] : []
})

export default store
