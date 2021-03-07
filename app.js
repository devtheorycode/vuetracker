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
      let taskIndex = null
      this.tasks.forEach((task, index) => {
        if (task.id === taskID) {
          taskIndex = index
        }
      })

      this.tasks.splice(taskIndex, 1)
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
    <button @click="sendDelete" type="button" class="btn btn-danger" style="line-height: 1">
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
    sendDelete () {
      this.$emit('delete', this.id)
    }
  }
})

app.mount('#app')
