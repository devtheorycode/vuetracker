<template>
  <div>
    <h1>Accueil {{ $store.state.count }}</h1>
    <TaskList
      :tasks="tasks || []"
      :areTasksLoading="areTasksLoading"       
      v-on="{
        restart: sendRestart,
        delete: sendDelete,
      }"
    />
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import TaskList from '../components/TaskList.vue'
  export default {
    components: {
      TaskList
    },
    emits: ['restart', 'delete'],
    props: {
      tasks: {
        type: Array,
        default: []
      },
      areTasksLoading: {
        type: Boolean,
        default: false
      }
    },
    methods: {      
      sendRestart (data) {
        this.$emit('restart', data)
      },
      sendDelete (data) {
        this.$emit('delete', data)
      },
      ...mapActions([
        'resetCount'
      ])
    },
    async mounted () {
      await this.resetCount()
      console.log('action finished')
    },
  }
</script>

<style lang="scss" scoped>

</style>