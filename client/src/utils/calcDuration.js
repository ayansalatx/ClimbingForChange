// Calculate total elapsed time between first lap start and last lap end
export const getTimeElapsed = (laps) => {
  if (!laps.length) return null
  const start = new Date(laps[0].startDateTime)
  const end = new Date(laps[laps.length - 1].endDateTime)
  return end - start
}

export const getDuration = (start, end) => {
  if (isNaN(start) || isNaN(end)) return 0

  return end - start
}
