<template>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">

    <el-table-column
      prop="name"
      label="Tâche">
    </el-table-column>

    <el-table-column
      align="right"
      prop="datesBetween"
      label="Début et fin"
      width="100">
      <template #header></template>
    </el-table-column>

    <el-table-column
      align="right"
      prop="duration"
      label="Durée"
      width="100">
      <template #header></template>
    </el-table-column>

    <el-table-column
      align="right"
      label="Actions"
      width="200">      
      <template #header></template>
      <template #default="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">Editer</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Supprimer</el-button>
      </template>
    </el-table-column>
    
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          datesBetween: '2016-05-03',
          duration: '00:00:45',
          name: 'No. 189, Grove St, Los Angeles'
        }, {
          datesBetween: '2016-05-02',
          duration: '00:00:45',
          name: 'No. 189, Grove St, Los Angeles'
        }, {
          datesBetween: '2016-05-04',
          duration: '00:00:45',
          name: 'No. 189, Grove St, Los Angeles'
        }, {
          datesBetween: '2016-05-01',
          duration: '00:00:45',
          name: 'No. 189, Grove St, Los Angeles'
        }]
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
  }
</script>