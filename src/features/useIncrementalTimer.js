import { ref } from 'vue'

export const useIncrementalTimer = () => {
  const nowTime = ref(null)
  const intervalEverySecond = ref(null)

  function startTimer () {
    nowTime.value = Date.now()
    intervalEverySecond.value = setInterval(() => {
      nowTime.value = Date.now()
    }, 1000)
  }

  function stopTimer () {
    nowTime.value = null
    clearInterval(intervalEverySecond.value)
  }

  return {
    nowTime,
    startTimer,
    stopTimer
  }
}
