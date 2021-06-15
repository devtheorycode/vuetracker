<template>
  <h2>Utilisateurs</h2>
  <div v-if="$store.state.users.currentUser">
    <strong>Connecté</strong> : {{ $store.state.users.currentUser.email }} 
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>

</style>