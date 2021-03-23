<template>
  <div>
    <h1>Paramètres</h1>
    <router-view @updateTasks="$emit('updateTasks')"></router-view>
  </div>
</template>

<script>
  export default {
    emits: ['updateTasks'],
  }
</script>

<style lang="scss" scoped>

</style>