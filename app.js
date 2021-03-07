const app = Vue.createApp({
  data () {
    return {
      title: 'Vue<strong>Tracker</strong>',
      logoSource: 'https://cdn.svgporn.com/logos/vue.svg',
      tsFormatter: Intl.DateTimeFormat('fr', { hour: '2-digit', minute: '2-digit' }),
      tasks: [],
      taskID: 0,
      taskname: '',
      isTaskInProgress: false,
      startTime: null,
      nowTime: null,
      intervalEverySecond: null,
      errorMsg: null
    }
  },
  computed: {
    currentDuration () {
      if (this.startTime && this.nowTime) {
        return this.durationBetweenTimestamps(this.startTime, this.nowTime)
      } else {
        return '00:00:00'
      }
    }
  },
  watch: {
    isTaskInProgress (isInProgress) {
      if (isInProgress) {
        this.intervalEverySecond = setInterval(() => {
          this.nowTime = Date.now()
        }, 1000)
      } else {
        clearInterval(this.intervalEverySecond)
      }
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
      this.nowTime = Date.now()
    },
    stopTask () {
      // Vérifications
      if (!this.isTaskInProgress) {
        this.errorMsg = "Aucune tâche n'est en cours"
        return
      }

      // Enregistrement de la tâche
      this.tasks.unshift({
        id: this.getAnID(),
        name: this.taskname,
        start: this.startTime,
        end: Date.now()
      })

      // Fin de la tâche
      this.isTaskInProgress = false
      this.errorMsg = null
      this.nowTime = null
      this.taskname = ''
    },
    toggleTask () {
      if (this.isTaskInProgress) {
        this.stopTask()
      } else {
        this.startTask()
      }
    },
    deleteTask (taskID) {
      // Récupération de l'index de la tâche
      let taskIndex = null
      this.tasks.forEach((task, index) => {
        if (task.id === taskID) {
          taskIndex = index
        }
      })

      // Suppression de la tâche
      this.tasks.splice(taskIndex, 1)
    },
    restartTask (oldTaskID) {
      // Arrêt de la tâche en cours si besoin
      if (this.isTaskInProgress) {
        this.stopTask()
      }

      // Récupération du nom de l'ancienne tâche
      let newTaskname = null
      this.tasks.forEach(task => {
        if (task.id === oldTaskID) {
          newTaskname = task.name
        }
      })

      // Lancement de la nouvelle tâche
      this.$nextTick(function () {
        this.taskname = newTaskname
        this.startTask()
      })
    },
    getAnID () {
      this.taskID++
      return this.taskID
    },
    formatTimestamp (ts) {
      return this.tsFormatter.format(ts)
    },
    durationBetweenTimestamps (start, end) {
      let seconds = Math.floor((end / 1000) - (start / 1000))
      let minutes = Math.floor(seconds / 60)
      const hours = Math.floor(minutes / 60)
      seconds = seconds % 60
      minutes = minutes % 60
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }
  }
})

app.component('task-actions', {
  template: `
    <button @click="sendRestart" type="button" class="btn btn-secondary" style="line-height: 1">
      <svg height="15" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </button>
    <button @click="sendDelete" type="button" class="btn btn-danger ms-2" style="line-height: 1">
      <svg height="15" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  `,
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  methods: {
    sendRestart () {
      this.$emit('restart', this.id)
    },
    sendDelete () {
      this.$emit('delete', this.id)
    }
  }
})

app.mount('#app')
