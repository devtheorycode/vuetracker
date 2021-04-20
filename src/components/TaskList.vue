<template>

  <el-select v-model="sortBy" placeholder="Ordre des tâches">
    <el-option label="La plus récente d'abord" value="descending"></el-option>
    <el-option label="La plus ancienne d'abord" value="ascending"></el-option>
  </el-select>

  <div v-for="dayTasks, dayTS in tasksByDay" :key="dayTS">
    <h3>{{ fullDateFormatter.format(dayTS) }}</h3>
    <el-table
      :data="dayTasks"
      :row-class-name="checkHighlight"
      row-key="id"
      @row-click="setHighlight"
      empty-text="Aucune tâche"
      style="width: 100%"
      v-loading="areTasksLoading"
      :ref="dayTS"
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
        width="350">      
        <template #header></template>
        <template #default="scope">
          <TaskListActions
          :taskID="scope.row.id"
          :taskname="scope.row.name"
          />
        </template>
      </el-table-column>
      
    </el-table>
  </div>

</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import TaskListActions from './TaskListActions.vue'
  import TimestampsMixin from '../mixins/timestamps.js'

  export default {
    components: {
      TaskListActions
    },
    mixins: [TimestampsMixin],
    data() {
      return {
        defaultSortBy: 'descending',
        sortBy: (this.$route.query.sortBy === 'ascending') ? 'ascending' : 'descending'
      }
    },
    computed: {
      ...mapState({
        areTasksLoading: (state) => state.tasks.areTasksLoading
      }),
      ...mapGetters({
        tasksByDay: 'tasks/tasksByDay'
      })
    },
    watch: {
      sortBy(newVal) {
        this.$router.push({ query: { sortBy: (newVal === this.defaultSortBy) ? undefined : newVal } })
        this.sortTable()
      },
      tasksByDay: {
        deep: true,
        handler() {
          this.$nextTick(() => {
            this.sortTable()
          })
        }
      }
    },
    methods: {
      sortTable() {
        for (let dayTS in this.tasksByDay) {
          this.$refs[dayTS].sort('name', this.sortBy)
        }
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
h3 {
  text-align: left;
  text-transform: capitalize;
}
</style>