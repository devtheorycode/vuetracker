<template>
  <el-menu default-active="1">

    <h3>Vue Tracker</h3>

    <el-menu-item index="1">
      <i class="el-icon-time"></i>
      <span>Tracker</span>
    </el-menu-item>

    <el-menu-item index="2" disabled>
      <i class="el-icon-folder-opened"></i>
      <span>Catégories</span>
    </el-menu-item>

    <el-menu-item index="3" disabled>
      <i class="el-icon-setting"></i>
      <span>Paramètres</span>
    </el-menu-item>
    
  </el-menu>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>
.el-menu {
  border-right: none !important;
  text-align: left;
}

h3 {
  text-align: center;
}

</style>