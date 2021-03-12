<template>
  <el-button @click="sendCopyTaskname" size="small" icon="el-icon-document-copy" circle></el-button>
  <el-button @click="sendRestart" size="small" icon="el-icon-video-play" type="primary" circle></el-button>
  <el-button @click="sendDelete" size="small" icon="el-icon-delete" type="danger" circle></el-button>
</template>

<script>
  export default {
    props: {
      taskID: {
        type: String,
        required: true
      },
    },
    emits: ['restart', 'delete', 'copyTaskname'],
    methods: {
      sendRestart () {
        this.$emit('restart', this.taskID)
      },
      sendDelete () {
        this.$emit('delete', this.taskID)
      },
      sendCopyTaskname() {
        this.$emit('copyTaskname')
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>