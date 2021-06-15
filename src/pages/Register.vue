<template>
  <div>
    <h1>Inscription</h1>
    <el-row>
      <el-col :span="12" :offset="6"> 
        <form action="/" method="get" @submit.prevent="sendForm">

          <fieldset>

            <legend>Informations de connexion</legend>

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

            <BaseInput
              label="Confirmation du mot de passe"
              v-model="passwordConfirm"
              type="password"
              id="passwordConfirm"
              aria-describedby="passwordConfirmError"
              :aria-invalid="v$.passwordConfirm.$invalid"
            />
            <el-alert 
              v-if="v$.passwordConfirm.$error" 
              :title="v$.passwordConfirm.$error ? v$.passwordConfirm.$errors[0].$message : ''" 
              type="error"
              :closable="false"
              id="passwordConfirmError"
            ></el-alert>

          </fieldset>

          <fieldset>

            <legend>Finalisation de l'inscription</legend>
          
            <BaseCheckbox
              v-model="termsOfUse"
              aria-describedby="termsOfUseError"
              :aria-invalid="v$.termsOfUse.$invalid"
            >
              Conditions d'utilisation
            </BaseCheckbox>
            <el-alert 
              v-if="v$.termsOfUse.$error" 
              :title="v$.termsOfUse.$error ? v$.termsOfUse.$errors[0].$message : ''" 
              type="error"
              :closable="false"
              id="termsOfUseError"
            ></el-alert>

            <div>
              <el-button type="primary" native-type="submit" :loading="loading" @click.prevent="sendForm">Confirmer</el-button>
            </div>

          </fieldset>

        </form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { reactive, toRef, toRefs, watch } from 'vue'
  import { useVuelidate } from '@vuelidate/core'
  import { required, email, minLength, sameAsPassword, sameAsTrue } from '../utils/validators.js'
  import BaseInput from '../components/BaseInput.vue'
  import BaseCheckbox from '../components/BaseCheckbox.vue'
  export default {
    components: { 
      BaseInput,
      BaseCheckbox
    },
    setup() {
      const state = reactive({
        email: '',
        password: '',
        passwordConfirm: '',
        termsOfUse: false,
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
        },
        passwordConfirm: {
          required,
          sameAsPassword: sameAsPassword(toRef(state, 'password'))
        },
        termsOfUse: {
          required,
          sameAsTrue
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

      // Ré-éxecution des validators de passwordConfirm si password change après-coup
      watch(toRef(state, 'password'), () => {
        if (v$.value.passwordConfirm.$dirty) {
          v$.value.passwordConfirm.$reset()
          v$.value.passwordConfirm.$touch()
        }
      })

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