<template>
  <div>
    <h1>Inscription</h1>
    <el-row>
      <el-col :span="12" :offset="6"> 
        <form action="/" method="get">

          <label>Adresse email</label>
          <el-input 
            placeholder="hello@vuetracker.fr"
            type="email"
          ></el-input>
          <el-alert 
            v-if="false" 
            title="Erreur" 
            type="error"
            :closable="false"
          ></el-alert>

          <label>Mot de passe</label>
          <el-input type="password"></el-input>
          <el-alert 
            v-if="false" 
            title="Erreur" 
            type="error"
            :closable="false"
          ></el-alert>

          <label>Confirmation du mot de passe</label>
          <el-input type="password"></el-input>
          <el-alert 
            v-if="false" 
            title="Erreur" 
            type="error"
            :closable="false"
          ></el-alert>
          
          <el-checkbox>Conditions d'utilisation</el-checkbox>
          <el-alert 
            v-if="false" 
            title="Erreur" 
            type="error"
            :closable="false"
          ></el-alert>

          <div>
            <el-button type="primary" native-type="submit">Confirmer</el-button>
          </div>

        </form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
  form { 
    padding: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    border-radius: 4px;
    text-align: left;
  }
  .el-input, .el-alert  { 
    display: block;
    max-width: 75%;
    margin: 10px 0;
  }
  .el-checkbox {
    margin: 20px 0 0;
  }
  .el-button {
    margin-top: 25px;
  }
</style>