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

export const Auth = auth