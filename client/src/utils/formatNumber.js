// Returns format: 1,000
export const formatNumber = (number) => {
  return typeof number === 'number'
    ? new Intl.NumberFormat('en-US').format(number)
    : number
}
