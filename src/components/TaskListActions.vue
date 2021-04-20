<template>

  <TaskListActionsButton @click="copyToClipboard(taskname)">
    Copier
    <i class="el-icon-document-copy" />
  </TaskListActionsButton>

  <TaskListActionsButton @click="restartTask(taskID)" type="primary">
    Relancer
    <i class="el-icon-video-play" />
  </TaskListActionsButton>

  <TaskListActionsButton @click="deleteTask(taskID)" type="danger" >
    Supprimer
    <i class="el-icon-delete" />
  </TaskListActionsButton>

</template>

<script>
  import { mapActions } from 'vuex'
  import TaskListActionsButton from './TaskListActionsButton.vue'
  export default {
    components: { TaskListActionsButton },
    props: {
      taskID: {
        type: String,
        required: true
      },
      taskname: {
        type: String,
        required: true
      }
    },
    methods: {
      ...mapActions({
        deleteTask: 'tasks/deleteTask',
        restartTask: 'tasks/restartTask',
        sendSuccess: 'notifications/sendSuccess'
      }),
      copyToClipboard(text) {
        navigator.clipboard.writeText(text)
        this.sendSuccess({
          title: 'Succès',
          message: `Le nom de cette tâche a bien été copié`
        });
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>