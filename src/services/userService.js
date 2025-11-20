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

  // Update user (Admin only - untuk manage user lain)
  update(id, data) {
    return apiClient.put(`/users/${id}`, data)
  },

  // 👇 TAMBAHKAN 2 METHOD INI - untuk update profile sendiri
  // Update profile sendiri (Semua user bisa akses)
  updateProfile(data) {
    return apiClient.put('/profile', data)
  },

  // Update password sendiri (Semua user bisa akses)
  updatePassword(newPassword) {
    return apiClient.put('/profile/password', {
      new_password: newPassword
    })
  },

  // Delete user
  delete(id) {
    return apiClient.delete(`/users/${id}`)
  },

  // Toggle active status
  toggleActive(id) {
    return apiClient.post(`/users/${id}/toggle-active`)
  },

  // Reset password (Admin only - untuk reset password user lain)
  resetPassword(id, newPassword) {
    return apiClient.post(`/users/${id}/reset-password`, {
      new_password: newPassword
    })
  }
}