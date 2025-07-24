// Format time to display with hours
export const formatDurationTimeHours = (durationMs) => {
  const totalSeconds = Math.floor(durationMs / 1000)
  const seconds = totalSeconds % 60
  const totalMinutes = Math.floor(totalSeconds / 60)
  const minutes = totalMinutes % 60
  const hours = Math.floor(totalMinutes / 60)

  return `${String(hours).padStart(2, '00')}:${String(minutes).padStart(2, '00')}:${String(seconds).padStart(2, '00')}`
}

// Format time to display without hours
export const formatDurationTimeMinutes = (durationMs) => {
  const totalSeconds = Math.floor(durationMs / 1000)
  const seconds = totalSeconds % 60
  const minutes = Math.floor(totalSeconds / 60)

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}
