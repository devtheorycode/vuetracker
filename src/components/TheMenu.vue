<template>
  <el-menu :router="true" :default-active="(($route.matched[0] && $route.matched[0].path == '/') || $route.path == '/home') ? '/' : $route.path">

    <h3>Vue Tracker</h3>

    <el-menu-item index="/">
      <i class="el-icon-time"></i>
      <span>Tracker</span>
    </el-menu-item>

    <el-submenu index="/settings">
      <template #title>
        <i class="el-icon-setting"></i>
        <span>Paramètres</span>
      </template>
      <el-menu-item index="/settings/app">Application</el-menu-item>
      <el-menu-item index="/settings/user">Utilisateur</el-menu-item>
    </el-submenu>
    
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
  overflow-x: hidden;
}

h3 {
  text-align: center;
}

</style>