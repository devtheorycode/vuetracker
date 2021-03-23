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
  import { getAll as getAllTasks, updateAxiosInstance } from '../services/TaskService.js'
  
  export default {    
    data() {
      return {
        inputValueJsonBinKey: '',
        inputValueJsonBinID: '',
        areNewValuesBeingTested: false
      }
    },
    emits: ['updateTasks'],
    methods: {
      async updateApiValues() {
        // Mise à jour des valeurs de JSONBin.io
        this.areNewValuesBeingTested = true
        if (this.inputValueJsonBinKey !== '') {
          localStorage.setItem('jsonBinKey', this.inputValueJsonBinKey)
        } else {
          localStorage.removeItem('jsonBinKey')
        }
        if (this.inputValueJsonBinID !== '') {
          localStorage.setItem('jsonBinID', this.inputValueJsonBinID)
        } else {
          localStorage.removeItem('jsonBinID')
        }

        // Tests dela connexion avec JSONBin.io
        updateAxiosInstance()
        try {
          await getAllTasks()
          localStorage.setItem('jsonBinAccess', true)
          this.$emit('updateTasks')
          this.$notify({
            title: 'Succès',
            message: `Vos clés sont enregistrés dans ce navigateur`,
            type: 'success',
            offset: 50,
            duration: 3000
          });
        } catch(e) {
          localStorage.removeItem('jsonBinAccess')
          this.$notify({
            title: 'Erreur',
            message: `Cette combinaison de fonctionne pas sur JSONBin.io`,
            type: 'error',
            offset: 50,
            duration: 3000
          });
        }
        this.areNewValuesBeingTested = false
      }
    },
    created() {
      // Mise en place des valeurs du localStorage sur l'instance
      const jsonBinKey = localStorage.getItem('jsonBinKey');
      const jsonBinID = localStorage.getItem('jsonBinID');
      if (jsonBinKey) {
        this.inputValueJsonBinKey = jsonBinKey
      }
      if (jsonBinID) {
        this.inputValueJsonBinID = jsonBinID
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