<template>
  <el-row>

    <el-col :xs="12" :span="15" :lg="18">
      <el-input @keyup.enter="toggleTask" v-model="taskname" placeholder="Nom de votre tâche"></el-input>
    </el-col>

    <el-col :xs="12" :span="9" :lg="6" class="actions">
      <strong>{{ currentDuration }}</strong>
      <el-button v-if="!isTaskInProgress" @click="beforeStartTask" type="primary" icon="el-icon-video-play" circle></el-button>
      <el-button v-else @click="beforeStopTask" type="danger" icon="el-icon-video-pause" circle></el-button>
    </el-col>

  </el-row>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    data() {
      return {
        nowTime: null,
        intervalEverySecond: null,
        errorMsg: null
      }
    },
    computed: {
      ...mapState({
        startTime: (state) => state.tasks.currentStartTime,
        isTaskInProgress: (state) => state.tasks.isTaskInProgress
      }),
      taskname: {
        get () {
          return this.$store.state.tasks.currentTaskname
        },
        set (value) {
          this.$store.commit('tasks/SET_CURRENT_TASKNAME', value)
        }
      },
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
          this.nowTime = Date.now()
          this.intervalEverySecond = setInterval(() => {
            this.nowTime = Date.now()
          }, 1000)
        } else {  
          this.errorMsg = null
          this.nowTime = null
          clearInterval(this.intervalEverySecond)
        }
      },
      errorMsg (newVal) {
        // Notification en cas d'erreur
        if (newVal !== null) {
          this.sendWarning({
            title: 'Attention',
            message: this.errorMsg
          })
          this.errorMsg = null
        }
      }
    },
    methods: {
      ...mapActions({
        addTask: 'tasks/addTask',
        startTask: 'tasks/startTask',
        stopTask: 'tasks/stopTask',
        sendWarning: 'notifications/sendWarning'
      }),
      beforeStartTask () {
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
        this.startTask()
      },
      beforeStopTask () {
        // Vérifications
        if (!this.isTaskInProgress) {
          this.errorMsg = "Aucune tâche n'est en cours"
          return
        }

        // Envoie de la nouvelle tâche à ajouter        
        this.stopTask()
      },
      toggleTask () {
        if (this.isTaskInProgress) {
          this.beforeStopTask()
        } else {
          this.beforeStartTask()
        }
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
  }
</script>

<style lang="scss" scoped>
.el-input {
  padding-left: 20px;
  box-sizing: border-box;
}

.actions {
  text-align: right;
  padding-right: 20px;
  strong {
    padding-right: 20px;
  }
}
</style>