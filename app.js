Vue.createApp({
  data () {
    return {
      title: 'Vue<strong>Tracker</strong>',
      logoSource: 'https://cdn.svgporn.com/logos/vue.svg',
      taskname: '',
      isTaskInProgress: false,
      startTime: null,
      errorMsg: null
    }
  },
  methods: {
    startTask () {
      // Vérifications
      if (this.taskname.length === 0) {
        this.errorMsg = "Le nom d'une tâche ne peut pas être vide"
        return
      } else if (this.isTaskInProgress) {
        this.errorMsg = 'Une tâche est déjà en cours'
        return
      } else {
        this.errorMsg = null
      }

      // Début de la tâche
      this.isTaskInProgress = true
      this.startTime = Date.now()
    },
    stopTask () {
      // Vérifications
      if (!this.isTaskInProgress) {
        this.errorMsg = "Aucune tâche n'est en cours"
        return
      }

      // Fin de la tâche
      this.isTaskInProgress = false
      this.errorMsg = null
    }
  }
}).mount('#app')
