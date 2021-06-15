<template>

  <h2>Utilisateurs</h2>

  <div v-if="$store.state.users.currentUser">
    <strong>Connecté</strong> : {{ $store.state.users.currentUser.email }}
    <p>
      <el-button @click="dialogVisible = true" type="danger" round>Déconnexion</el-button>
    </p>
  </div>

  <el-dialog
    title="Confirmation de déconnexion"
    v-model="dialogVisible"
    width="30%">
    <span>Êtes-vous sûr de vouloir vous déconnecter ?</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Annuler</el-button>
        <el-button type="danger" @click="confirmLogout" :loading="loading">Confirmer</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        loading: false
      }
    },
    methods: {
      async confirmLogout() {
        this.loading = true
        const res = await this.$store.dispatch('users/logout')
        this.loading = false
        if (res === true) {
          this.$router.push('/login')
        } else {
          this.dialogVisible = false
          this.$store.dispatch('notifications/sendError', {
            title: "Erreur de déconnexion",
            message: res
          })
        }
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>