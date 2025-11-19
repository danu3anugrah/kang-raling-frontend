import { defineStore } from 'pinia'
import apiClient from '@/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: false
  }),

  getters: {
    isAdmin: (state) => state.user?.role === 'admin',
    isFasilitator: (state) => state.user?.role === 'fasilitator',
    userName: (state) => state.user?.name || 'User',
    userRole: (state) => state.user?.role || 'fasilitator'
  },

  actions: {
    async login(email, password) {
      try {
        const response = await apiClient.post('/login', { email, password })
        this.token = response.data.access_token
        this.user = response.data.user
        this.isAuthenticated = true
        
        localStorage.setItem('token', this.token)
        
        return { success: true }
      } catch (error) {
        return { 
          success: false, 
          message: error.response?.data?.message || 'Login gagal' 
        }
      }
    },

    async logout() {
      try {
        await apiClient.post('/logout')
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        this.user = null
        this.token = null
        this.isAuthenticated = false
        localStorage.removeItem('token')
      }
    },

    async checkAuth() {
      if (this.token) {
        try {
          const response = await apiClient.get('/me')
          this.user = response.data
          this.isAuthenticated = true
        } catch (error) {
          this.logout()
        }
      }
    }
  }
})