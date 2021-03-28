<template>
  <el-button @click="copyToClipboard(taskname)" size="small" icon="el-icon-document-copy" circle></el-button>
  <el-button @click="restartTask(taskname)" size="small" icon="el-icon-video-play" type="primary" circle></el-button>
  <el-button @click="deleteTask(taskID)" size="small" icon="el-icon-delete" type="danger" circle></el-button>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
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
      ...mapActions([
        'deleteTask',
        'restartTask'
      ]),
      copyToClipboard(text) {
        navigator.clipboard.writeText(text)
        this.$notify({
          title: 'Succès',
          message: `Le nom de cette tâche a bien été copié`,
          type: 'success',
          offset: 50,
          duration: 1500
        });
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>