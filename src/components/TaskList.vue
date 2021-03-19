<template>

  <el-select v-model="sortBy" placeholder="Ordre des tâches">
    <el-option label="La plus récente d'abord" value="descending"></el-option>
    <el-option label="La plus ancienne d'abord" value="ascending"></el-option>
  </el-select>

  <el-table
    :data="tasks"
    :row-class-name="checkHighlight"
    row-key="id"
    @row-click="setHighlight"
    empty-text="Aucune tâche"
    style="width: 100%"
    v-loading="areTasksLoading"
    ref="table"
    >

    <el-table-column
      prop="name"
      sort-by="startTime"
      label="Tâche">
    </el-table-column>

    <el-table-column
      align="right"
      label="Début et fin"
      width="150">
      <template #header></template>      
      <template #default="scope">
        {{ formatTimestamp(scope.row.startTime)  }} - {{ formatTimestamp(scope.row.endTime) }}
      </template>
    </el-table-column>

    <el-table-column
      align="right"
      label="Durée"
      width="100">
      <template #header></template>
      <template #default="scope">
        {{ durationBetweenTimestamps(scope.row.startTime, scope.row.endTime) }}
      </template>
    </el-table-column>

    <el-table-column
      align="right"
      label="Actions"
      width="200">      
      <template #header></template>
      <template #default="scope">
        <TaskListActions
         :taskID="scope.row.id"
         v-on="{
           restart: sendRestart,
           delete: sendDelete,
         }"
         @copyTaskname="copyToClipboard(scope.row.name)"
        />
      </template>
    </el-table-column>
    
  </el-table>
</template>

<script>
  import TaskListActions from './TaskListActions.vue'

  export default {
    components: {
      TaskListActions
    },
    data() {
      return {        
        tsFormatter: Intl.DateTimeFormat('fr', { hour: '2-digit', minute: '2-digit' }),
        defaultSortBy: 'descending',
        sortBy: (this.$route.query.sortBy === 'ascending') ? 'ascending' : 'descending'
      }
    },
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
    watch: {
      sortBy(newVal) {
        this.$router.push({ query: { sortBy: (newVal === this.defaultSortBy) ? undefined : newVal } })
        this.sortTable()
      },
      tasks: {
        deep: true,
        handler() {
          this.sortTable()
        }
      }
    },
    methods: {
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
      },
      sendRestart (data) {
        this.$emit('restart', data)
      },
      sendDelete (data) {
        this.$emit('delete', data)
      },
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
      sortTable() {
        this.$refs.table.sort('name', this.sortBy)
      },
      checkHighlight({ row }) {
        if (this.$route.params.taskID && row.id === this.$route.params.taskID) {
          return 'highlight-line'
        } else {
          return ''
        }
      },
      setHighlight(row) {
        this.$router.push({ path: '/home/' + row.id })
      }
    },
    mounted () {
      this.sortTable()
    },
  }
</script>

<style scoped>
.el-select {
  float: right;
}
</style>