// Returns format: MM/DD/YYYY
export const formatDateNumeric = (dateInput) => {
  const date = new Date(dateInput)
  if (isNaN(date)) return '-'
  return date.toLocaleDateString('en-US')
}

// Returns format: July 15, 2025
export const formatDateLong = (dateInput) => {
  const date = new Date(dateInput)
  if (isNaN(date)) return '-'
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

// Returns format: Jul 15, 2025
export const formatDateShort = (dateInput) => {
  const date = new Date(dateInput)
  if (isNaN(date)) return '-'
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// Returns format: 07:45 PM
export const formatTime = (dateInput) => {
  const date = new Date(dateInput)
  if (isNaN(date)) return '-'
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

// Returns format: 07:45:50 PM
export const formatTimeSeconds = (dateInput) => {
  const date = new Date(dateInput)
  if (isNaN(date)) return '-'
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  })
}

// Returns format: July 15, 2025, 07:45:50 PM
export const formatDateTimeLong = (dateInput) => {
  const date = new Date(dateInput)
  if (isNaN(date)) return '-'
  return date.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  })
}

// Returns format: Jul 15, 2025, 07:45:50 PM
export const formatDateTimeShort = (dateInput) => {
  const date = new Date(dateInput)
  if (isNaN(date)) return '-'
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  })
}

export const formatDateTimeShortNoSec = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString([], {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}
