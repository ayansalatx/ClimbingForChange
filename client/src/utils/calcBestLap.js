// Returns the lap with shortest duration, or null if no laps
export const getBestLapTime = (laps) => {
  if (!laps.length) return null
  const bestLap = laps.reduce((best, current) => {
    const bestDuration
      = new Date(best.endDateTime) - new Date(best.startDateTime)
    const currentDuration
      = new Date(current.endDateTime) - new Date(current.startDateTime)
    return currentDuration < bestDuration ? current : best
  }, laps[0])

  return new Date(bestLap.endDateTime) - new Date(bestLap.startDateTime)
}
