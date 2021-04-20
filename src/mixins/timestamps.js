export default {
  data () {
    return {
      tsFormatter: Intl.DateTimeFormat('fr', { hour: '2-digit', minute: '2-digit' }),
      fullDateFormatter: Intl.DateTimeFormat('fr', { dateStyle: 'full' })
    }
  },
  methods: {
    formatTimestamp (ts) {
      return this.tsFormatter.format(ts)
    },
    durationBetweenTimestamps (start, end) {
      let seconds = Math.floor((end / 1000) - (start / 1000))
      let minutes = Math.floor(seconds / 60)
      const hours = Math.floor(minutes / 60)
      seconds = seconds % 60
      minutes = minutes % 60
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }
  }
}
