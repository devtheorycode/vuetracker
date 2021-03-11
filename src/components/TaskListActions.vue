<template>
  <el-button
    size="mini"
    @click="sendRestart">Relancer</el-button>
  <el-button
    size="mini"
    type="danger"
    @click="sendDelete">Supprimer</el-button>
</template>

<script>
  export default {
    props: {
      taskID: {
        type: Number,
        required: true
      },
    },
    emits: ['restart', 'delete'],
    methods: {
      sendRestart () {
        this.$emit('restart', this.taskID)
      },
      sendDelete () {
        this.$emit('delete', this.taskID)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>