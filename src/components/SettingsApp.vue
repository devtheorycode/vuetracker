<template>
  <h2>Application</h2>
  <el-row>
    <el-col :offset="6" :span="12">
      <p>Clé secrète de votre API JSONbin.io :</p>
      <el-input placeholder="API KEY" v-model="inputValueJsonBinKey"></el-input>
      <p>ID de votre bin :</p>
      <el-input placeholder="BIN ID" v-model="inputValueJsonBinID"></el-input>
      <el-button type="primary" @click="updateApiValues" :loading="areNewValuesBeingTested">Confirmer</el-button>
    </el-col>
  </el-row>
</template>

<script>
  import { ref, watch } from 'vue'
  import { useStore } from 'vuex'
  import { updateAxiosInstance } from '../services/TaskService.js'
  
  export default {
    setup () {

      const store = useStore()

      let inputValueJsonBinKey = ref(localStorage.getItem('jsonBinKey') || '')
      let inputValueJsonBinID = ref(localStorage.getItem('jsonBinID') || '')
      let isAPIConnected = ref(localStorage.getItem('jsonBinAccess') || false)
      let areNewValuesBeingTested = ref(false)

      watch(isAPIConnected, (newValue) => {
        if (newValue) {
          localStorage.setItem('jsonBinAccess', true)
        } else {
          localStorage.removeItem('jsonBinAccess')
        }
      })

      let updateApiValues = async function () {
        // Mise à jour des valeurs de JSONBin.io
        areNewValuesBeingTested.value = true
        if (inputValueJsonBinKey.value !== '') {
          localStorage.setItem('jsonBinKey', inputValueJsonBinKey.value)
        } else {
          localStorage.removeItem('jsonBinKey')
        }
        if (inputValueJsonBinID.value !== '') {
          localStorage.setItem('jsonBinID', inputValueJsonBinID.value)
        } else {
          localStorage.removeItem('jsonBinID')
        }

        // Tests dela connexion avec JSONBin.io
        updateAxiosInstance()
        try {
          await store.dispatch('tasks/fetchAllTasks')
          isAPIConnected.value = true
          store.dispatch('notifications/sendSuccess', {
            title: 'Succès',
            message: `Vos clés sont enregistrés dans ce navigateur`
          });
        } catch(e) {
          isAPIConnected.value = false
          store.dispatch('notifications/sendError', {
            title: 'Erreur',
            message: `Cette combinaison de fonctionne pas sur JSONBin.io`
          });
        }
        areNewValuesBeingTested.value = false
      }

      return {
        inputValueJsonBinKey,
        inputValueJsonBinID,
        areNewValuesBeingTested,
        updateApiValues
      }

    }
  }
</script>

<style lang="scss" scoped>
p { text-align: left; }
.el-button {
  margin-top: 20px;
}
</style>