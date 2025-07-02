import api from './api';

const API_URL = '/api/rfidtags';

export const getRfidTags = async () => {
  const response = await api.get(API_URL);
  return response.data;
};

export const getRfidTag = async (id) => {
  const response = await api.get(`${API_URL}/${id}`);
  return response.data;
};

export const createRfidTag = async (rfidData) => {
  const response = await api.post(API_URL, {
    serialNumber: rfidData.tagId,
    status: rfidData.status,
  });
  return response.data;
};

export const updateRfidTag = async (id, rfidData) => {
  const response = await api.put(`${API_URL}/${id}`, {
    serialNumber: rfidData.tagId,
    status: rfidData.status,
  });
  return response.data;
};

export const deleteRfidTag = async (id) => {
  await api.delete(`${API_URL}/${id}`);
  return id;
};
