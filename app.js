const app = Vue.createApp({
  data () {
    return {
      title: 'Hello World'
    }
  }
}).mount('#app')

setTimeout(() => {
  app.$data.title = 'VueTracker'
}, 1000)
