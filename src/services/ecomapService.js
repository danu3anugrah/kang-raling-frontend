import apiClient from './api'

export default {
  // Ecomap
  getAllEcomaps() {
    return apiClient.get('/ecomaps')
  },

  getEcomapById(id) {
    return apiClient.get(`/ecomaps/${id}`)
  },

  createEcomap(data) {
    return apiClient.post('/ecomaps', data)
  },

  updateEcomap(id, data) {
    return apiClient.put(`/ecomaps/${id}`, data)
  },

  deleteEcomap(id) {
    return apiClient.delete(`/ecomaps/${id}`)
  },

  // Desa
  getAllDesas() {
    return apiClient.get('/desas')
  },

  getDesaById(id) {
    return apiClient.get(`/desas/${id}`)
  },

  createDesa(data) {
    return apiClient.post('/desas', data)
  },

  updateDesa(id, data) {
    return apiClient.put(`/desas/${id}`, data)
  },

  deleteDesa(id) {
    return apiClient.delete(`/desas/${id}`)
  }
}