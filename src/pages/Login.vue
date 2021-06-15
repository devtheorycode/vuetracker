<template>
  <div>
    <h1>Connexion</h1>
    <el-row>
      <el-col :span="12" :offset="6"> 
        <form action="/" method="get" @submit.prevent="sendForm">

          <BaseInput
            label="Adresse email"
            v-model="email"
            placeholder="hello@vuetracker.fr"
            type="email"
            id="email"
            aria-describedby="emailError"
            :aria-invalid="v$.email.$invalid"
          />
          <el-alert 
            v-if="v$.email.$error" 
            :title="v$.email.$error ? v$.email.$errors[0].$message : ''" 
            type="error"
            :closable="false"
            id="emailError"
          ></el-alert>

          <BaseInput
            label="Mot de passe"
            v-model="password"
            type="password"
            id="password"
            aria-describedby="passwordError"
            :aria-invalid="v$.password.$invalid"
          />
          <el-alert 
            v-if="v$.password.$error" 
            :title="v$.password.$error ? v$.password.$errors[0].$message : ''" 
            type="error"
            :closable="false"
            id="passwordError"
          ></el-alert>

          <div>
            <el-button type="primary" native-type="submit" :loading="loading" @click.prevent="sendForm">Confirmer</el-button>
          </div>

        </form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { reactive, toRefs } from 'vue'
  import { useVuelidate } from '@vuelidate/core'
  import { required, email, minLength } from '../utils/validators.js'
  import BaseInput from '../components/BaseInput.vue'
  export default {
    components: { 
      BaseInput
    },
    setup() {
      const state = reactive({
        email: '',
        password: '',
        loading: false
      })

      const rules = {
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(4)
        }
      }

      const v$ = useVuelidate(rules, state, { $autoDirty: true })

      const sendForm = () => {
        v$.value.$touch()
        if (!v$.value.$error) {
          state.loading = true
          setTimeout(() => {
            state.loading = false
          }, 1000)
        }
      }

      return {
        ...toRefs(state),
        v$,
        sendForm
      }

    }
  }
</script>

<style lang="scss" scoped>
  form { 
    padding: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    border-radius: 4px;
    text-align: left;
  }
  fieldset { border: none; }
  legend { display: none; }
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