<template>
  <el-container class="mainContainer">

    <el-aside width="200px">
      <TheMenu />
    </el-aside>

    <el-container>
      
      <el-header height="60px">
        <TheTopTask />
      </el-header>

      <el-main>
        <TaskList :tasks="tasks" />
      </el-main>

    </el-container>

  </el-container>
</template>

<script>
  import TheMenu from './components/TheMenu.vue'
  import TheTopTask from './components/TheTopTask.vue'
  import TaskList from './components/TaskList.vue'

  export default {
    components: {
      TheMenu,
      TheTopTask,
      TaskList
    },
    data() {
      const sample = {
        start: '2016-05-02',
        end: '00:43:13',
        name: 'No. 189, Grove St, Los Angeles'
      };
      return {
        tasks: Array(20).fill(sample)
      }
    }
  };
</script>

<style lang="scss">
body { margin: 0; }
#app {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.mainContainer { height: 100%; }

.el-aside {
  height: 100%;
  color: #333;
  border-right: solid 1px #e6e6e6;
}
.el-header {
  padding: 0 !important;
  border-bottom: solid 1px #e6e6e6;
  color: #333;
  line-height: 60px;
  .el-input .el-input__inner {
    border: none !important;
  }
}

</style>