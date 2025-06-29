import { api } from './api'

// Physical Mountains (Hills)
export const getPhysicalMountains = async () => {
  const res = await api.get('/mountains/physical')
  return res.data
}

export const createPhysicalMountain = async (mountainData) => {
  const res = await api.post('/mountains/physical', mountainData)
  return res.data
}

export const updatePhysicalMountain = async (id, mountainData) => {
  const res = await api.put(`/mountains/physical/${id}`, mountainData)
  return res.data
}

export const deletePhysicalMountain = async (id) => {
  const res = await api.delete(`/mountains/physical/${id}`)
  return res.data
}

// Target Mountains
export const getTargetMountains = async () => {
  const res = await api.get('/mountains/target')
  return res.data
}

export const getTargetMountainById = async (id) => {
  const res = await api.get(`/mountains/target/${id}`)
  return res.data
}

export const createTargetMountain = async (mountainData) => {
  const res = await api.post('/mountains/target', mountainData)
  return res.data
}

export const updateTargetMountain = async (id, mountainData) => {
  const res = await api.put(`/mountains/target/${id}`, mountainData)
  return res.data
}

export const deleteTargetMountain = async (id) => {
  const res = await api.delete(`/mountains/target/${id}`)
  return res.data
}
