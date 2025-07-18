import { api } from './api'

export const getLeaderboard = async (eventId) => {
  const params = eventId ? { eventId } : {}
  const res = await api.get('/leaderboard', { params })
  return res.data
}

export const getLeaderboardTeam = async (teamId) => {
  const res = await api.get(`/leaderboard/team/${teamId}`)
  return res.data
}
