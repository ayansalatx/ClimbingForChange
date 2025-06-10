import axios from 'axios'

const BASE_URL = 'http://localhost:5001/api'

export const fetchParticipants = () => {
  return axios.get(`${BASE_URL}/participants`)
}
