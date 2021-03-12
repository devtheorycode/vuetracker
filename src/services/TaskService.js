import axios from 'axios'

const JSON_BIN_SECRET = import.meta.env.VITE_JSON_BIN_SECRET
const instance = axios.create({
  baseURL: 'https://api.jsonbin.io/v3/b/604b81e17ea6546cf3dbe9fd',
  headers: { 'X-Master-Key': JSON_BIN_SECRET + 'e' }
})

// Récupération de toutes les tâches
export async function getAll () {
  const res = await instance.get('/latest')
  return res.data.record
}

// Mise à jour de toutes les tâches
export async function updateAll (newTasks) {
  await instance.put('/', newTasks)
}
