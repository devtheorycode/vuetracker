import axios from 'axios'

// Définition de l'instance en fonction des données en localstorage
let instance = null
updateAxiosInstance()

// Récupération de toutes les tâches
export async function getAll () {
  const res = await instance.get('/latest')
  return res.data.record
}

// Mise à jour de toutes les tâches
export async function updateAll (newTasks) {
  await instance.put('/', newTasks)
}

// Mise à jour de l'instance d'Axios
export async function updateAxiosInstance () {
  /* global localStorage */
  instance = axios.create({
    baseURL: 'https://api.jsonbin.io/v3/b/' + localStorage.getItem('jsonBinID'),
    headers: { 'X-Master-Key': localStorage.getItem('jsonBinKey') }
  })
}
