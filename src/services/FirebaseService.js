import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCgxGFnVv1GEyRVQOGNPDmF9jEmBn-nvNE',
  authDomain: 'vue-tracker-devtheory.firebaseapp.com',
  projectId: 'vue-tracker-devtheory',
  storageBucket: 'vue-tracker-devtheory.appspot.com',
  messagingSenderId: '343665362799',
  appId: '1:343665362799:web:d4167597f91f5705874a9a'
}

// Initialisation de Firebase et Firebase Auth
firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()

/* Exportations */

export const Auth = auth

export async function register (email, password) {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password)
    return [res, null]
  } catch (error) {
    return [null, error.code]
  }
}

export async function login (email, password) {
  try {
    const res = await auth.signInWithEmailAndPassword(email, password)
    return [res, null]
  } catch (error) {
    return [null, error.code]
  }
}

export async function logout () {
  try {
    await auth.signOut()
    return [true, null]
  } catch (error) {
    return [null, error.code]
  }
}

const errorsTranslations = {
  'auth/email-already-in-use': 'L\'email indiqué est déjà lié à un compte existant',
  'auth/invalid-email': 'L\'email n\'a pas un bon format',
  'auth/operation-not-allowed': 'La connexion via email & mot de passe n\'est pas activée',
  'auth/weak-password': 'Le mot de passe est trop faible (moins de 6 caractères)',
  'auth/user-disabled': 'Le compte lié à cet email est désactivé',
  'auth/user-not-found': 'Le compte lié à cet email n\'existe pas',
  'auth/wrong-password': 'Le mot de passe ne correspond pas à ce compte'
}

export function translateErrorCode (errorCode) {
  if (errorsTranslations[errorCode]) {
    return errorsTranslations[errorCode]
  } else {
    return `Erreur inconnue au sein de Firebase. (${errorCode})`
  }
}
