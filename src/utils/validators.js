import * as Validators from '@vuelidate/validators'
const withMessage = Validators.helpers.withMessage

export const helpers = Validators.helpers

// Built-in validators
export const required = withMessage('Ce champ est obligatoire', Validators.required)
export const email = withMessage("Format incorrect de l'adresse email", Validators.email)
export const minLength = (min) => withMessage(`Le nombre de caractères minimum est de ${min}`, Validators.minLength(min))
export const sameAs = (equalTo) => withMessage('Cette valeur ne correspond pas à celle désirée', Validators.sameAs(equalTo))

// Custom validators
export const sameAsPassword = (password) => withMessage('Les deux mots de passe ne sont pas identiques', Validators.sameAs(password))
export const sameAsTrue = withMessage('Cette case doit être cochée', Validators.sameAs(true))
