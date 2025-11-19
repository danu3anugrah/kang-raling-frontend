import apiClient from './api'

export default {
  // Get all users
  getAll() {
    return apiClient.get('/users')
  },

  // Get single user
  getById(id) {
    return apiClient.get(`/users/${id}`)
  },

  // Create user
  create(data) {
    return apiClient.post('/users', data)
  },

  // Update user
  update(id, data) {
    return apiClient.put(`/users/${id}`, data)
  },

  // Delete user
  delete(id) {
    return apiClient.delete(`/users/${id}`)
  },

  // Toggle active status
  toggleActive(id) {
    return apiClient.post(`/users/${id}/toggle-active`)
  },

  // Reset password
  resetPassword(id, newPassword) {
    return apiClient.post(`/users/${id}/reset-password`, {
      new_password: newPassword
    })
  }
}