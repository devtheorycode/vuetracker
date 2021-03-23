<template>
  <div>
    <h1>Page introuvable</h1>
    <h2 v-if="$route.params.wrongPath">"{{ $route.params.wrongPath }}"</h2>
    <el-button @click="$router.back()" type="primary" round>
      Revenir en arrière
    </el-button>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>

</style>