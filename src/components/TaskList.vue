<template>
  <el-table
    :data="tasks"
    stripe
    style="width: 100%">

    <el-table-column
      prop="name"
      label="Tâche">
    </el-table-column>

    <el-table-column
      align="right"
      prop="startTime"
      label="Début et fin"
      width="100">
      <template #header></template>
    </el-table-column>

    <el-table-column
      align="right"
      prop="endTime"
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
    props: {
      tasks: {
        type: Array,
        default: []
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