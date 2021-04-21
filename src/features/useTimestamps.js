import { reactive, toRefs } from 'vue'

export const useTimestamps = () => {
  // Fomratters
  const state = reactive({
    timeFormatter: Intl.DateTimeFormat('fr', { hour: '2-digit', minute: '2-digit' }),
    fullDateFormatter: Intl.DateTimeFormat('fr', { dateStyle: 'full' })
  })

  // Permet de formatter un timestamp en simple données de temps
  const formatTimestamp = function (ts) {
    return state.timeFormatter.format(ts)
  }

  // Permet de récupérer la durée formattée entre deux timestamps
  const durationBetweenTimestamps = function (start, end) {
    let seconds = Math.floor((end / 1000) - (start / 1000))
    let minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    seconds = seconds % 60
    minutes = minutes % 60
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  return {
    ...toRefs(state),
    formatTimestamp,
    durationBetweenTimestamps
  }
}
