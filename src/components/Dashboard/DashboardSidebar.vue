<template>
  <header class="dashboard-header">
    <div class="container-fluid">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <h4 class="mb-0">{{ pageTitle }}</h4>
          <p class="text-muted mb-0 small">{{ currentDate }}</p>
        </div>
        
        <div class="header-actions">
          <div class="user-info">
            <div class="user-avatar">
              <i class="bi bi-person-circle"></i>
            </div>
            <div class="user-details">
              <span class="user-name">{{ userName }}</span>
              <span class="user-role">Fasilitator</span>
            </div>
          </div>
          <button @click="handleLogout" class="btn btn-outline-danger btn-sm ms-3">
            <i class="bi bi-box-arrow-right"></i> Logout
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const userName = computed(() => authStore.user?.name || 'Fasilitator')

const pageTitle = computed(() => {
  const titles = {
    'Dashboard': 'Dashboard',
    'DashboardBlog': 'Kelola Blog',
    'DashboardGallery': 'Kelola Gallery',
    'DashboardEcomap': 'Kelola Ecomap'
  }
  return titles[route.name] || 'Dashboard'
})

const currentDate = computed(() => {
  return new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const handleLogout = async () => {
  if (confirm('Yakin ingin logout?')) {
    await authStore.logout()
    router.push('/login')
  }
}
</script>

<style scoped>
.dashboard-header {
  background: white;
  border-bottom: 1px solid #e0e0e0;
  padding: 20px 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.dashboard-header h4 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 15px;
  background: #f8f9fa;
  border-radius: 25px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
}

.user-details {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.user-name {
  font-weight: 600;
  color: #333;
  font-size: 0.95rem;
}

.user-role {
  font-size: 0.75rem;
  color: #999;
}

.btn-outline-danger {
  border-radius: 20px;
  padding: 8px 20px;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 768px) {
  .dashboard-header h4 {
    font-size: 1.2rem;
  }

  .user-details {
    display: none;
  }

  .btn-outline-danger span {
    display: none;
  }
}
</style>