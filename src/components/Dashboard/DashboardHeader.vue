<template>
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Sidebar Toggle Button (Mobile) -->
    <button class="navbar-toggler sidebar-toggler" type="button" @click="toggleSidebar">
      <i class="bi bi-list"></i>
    </button>

    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <!-- Empty for alignment -->
      </li>
      <li class="nav-item d-none d-md-inline-block">
        <router-link to="/dashboard" class="nav-link">
          <i class="bi bi-speedometer2 d-inline d-lg-none"></i>
          <span class="d-none d-lg-inline">Dashboard</span>
        </router-link>
      </li>
      <li class="nav-item d-none d-md-inline-block">
        <router-link to="/" class="nav-link">
          <i class="bi bi-house d-inline d-lg-none"></i>
          <span class="d-none d-lg-inline">Lihat Website</span>
        </router-link>
      </li>
    </ul>

    <!-- Mobile Page Title -->
    <div class="navbar-brand-mobile d-md-none">
      <span class="brand-text">Kang Raling</span>
    </div>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <!-- Current Date -->
      <li class="nav-item d-none d-sm-block">
        <span class="nav-link">
          <i class="bi bi-calendar3"></i>
          <span class="d-none d-lg-inline">{{ currentDate }}</span>
          <span class="d-lg-none">{{ shortDate }}</span>
        </span>
      </li>

      <!-- Mobile Date Badge -->
      <li class="nav-item d-sm-none">
        <span class="nav-link date-badge">
          <i class="bi bi-calendar3"></i>
          <small>{{ mobileDate }}</small>
        </span>
      </li>

      <!-- Fullscreen -->
      <li class="nav-item">
        <a class="nav-link" href="#" @click.prevent="toggleFullscreen" :title="isFullscreen ? 'Keluar Fullscreen' : 'Fullscreen'">
          <i class="bi" :class="isFullscreen ? 'bi-fullscreen-exit' : 'bi-arrows-fullscreen'"></i>
        </a>
      </li>

      <!-- Notifications (Optional) -->
      <li class="nav-item dropdown d-none d-md-block">
        <a class="nav-link" href="#" @click.prevent="toggleNotifications">
          <i class="bi bi-bell"></i>
          <span class="badge badge-danger navbar-badge" v-if="unreadNotifications > 0">{{ unreadNotifications }}</span>
        </a>
      </li>

      <!-- User Dropdown -->
      <li class="nav-item dropdown">
        <a class="nav-link user-dropdown-toggle" href="#" @click.prevent="toggleDropdown">
          <div class="user-avatar-sm">
            <i class="bi bi-person-circle"></i>
          </div>
          <span class="user-name d-none d-md-inline">{{ userName }}</span>
          <i class="bi bi-chevron-down dropdown-arrow"></i>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right" :class="{ show: showDropdown }" @click.stop>
          <div class="dropdown-header">
            <div class="user-info">
              <div class="user-avatar">
                <i class="bi bi-person-circle"></i>
              </div>
              <div class="user-details">
                <strong>{{ userName }}</strong>
                <small class="text-muted">{{ userEmail }}</small>
                <span class="user-role" :class="roleClass">{{ roleLabel }}</span>
              </div>
            </div>
          </div>
          <div class="dropdown-divider"></div>
          <router-link to="/dashboard/settings" class="dropdown-item" @click="showDropdown = false">
            <i class="bi bi-gear mr-2"></i> Pengaturan Akun
          </router-link>
          <a href="#" class="dropdown-item" @click.prevent="toggleTheme">
            <i class="bi" :class="themeIcon"></i> 
            {{ themeText }}
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item text-danger" @click.prevent="handleLogout">
            <i class="bi bi-box-arrow-right mr-2"></i> Logout
          </a>
        </div>
      </li>

      <!-- Mobile Menu Button -->
      <li class="nav-item d-md-none">
        <a class="nav-link" href="#" @click.prevent="toggleMobileMenu">
          <i class="bi bi-three-dots-vertical"></i>
        </a>
      </li>
    </ul>

    <!-- Mobile Menu Overlay -->
    <div class="mobile-menu-overlay" :class="{ 'active': showMobileMenu }" @click="showMobileMenu = false"></div>
    
    <!-- Mobile Menu -->
    <div class="mobile-menu" :class="{ 'active': showMobileMenu }">
      <div class="mobile-menu-header">
        <h5>Menu</h5>
        <button class="close-menu" @click="showMobileMenu = false">
          <i class="bi bi-x"></i>
        </button>
      </div>
      <div class="mobile-menu-content">
        <router-link to="/dashboard" class="mobile-menu-item" @click="showMobileMenu = false">
          <i class="bi bi-speedometer2"></i>
          Dashboard
        </router-link>
        <router-link to="/" class="mobile-menu-item" @click="showMobileMenu = false">
          <i class="bi bi-house"></i>
          Lihat Website
        </router-link>
        <router-link to="/dashboard/settings" class="mobile-menu-item" @click="showMobileMenu = false">
          <i class="bi bi-gear"></i>
          Pengaturan
        </router-link>
        <a href="#" class="mobile-menu-item text-danger" @click.prevent="handleLogout">
          <i class="bi bi-box-arrow-right"></i>
          Logout
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// State untuk responsive
const showDropdown = ref(false)
const showMobileMenu = ref(false)
const isFullscreen = ref(false)
const darkMode = ref(false)
const unreadNotifications = ref(3) // Contoh data

const userName = computed(() => authStore.user?.name || 'Fasilitator')
const userEmail = computed(() => authStore.user?.email || '')
const isAdmin = computed(() => authStore.isAdmin)
const roleLabel = computed(() => isAdmin.value ? 'Administrator' : 'Fasilitator')
const roleClass = computed(() => isAdmin.value ? 'role-admin' : 'role-user')

// Date formats untuk berbagai screen size
const currentDate = computed(() => {
  return new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const shortDate = computed(() => {
  return new Date().toLocaleDateString('id-ID', {
    month: 'short',
    day: 'numeric'
  })
})

const mobileDate = computed(() => {
  return new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'numeric'
  })
})

// Theme management
const themeIcon = computed(() => darkMode.value ? 'bi-sun' : 'bi-moon')
const themeText = computed(() => darkMode.value ? 'Mode Terang' : 'Mode Gelap')

const toggleSidebar = () => {
  // Emit event untuk toggle sidebar di parent component
  const event = new CustomEvent('toggle-sidebar')
  window.dispatchEvent(event)
}

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
    isFullscreen.value = true
  } else {
    document.exitFullscreen()
    isFullscreen.value = false
  }
}

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
  showMobileMenu.value = false
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
  showDropdown.value = false
}

const toggleNotifications = () => {
  // Implement notification logic here
  console.log('Toggle notifications')
}

const toggleTheme = () => {
  darkMode.value = !darkMode.value
  // Implement theme switching logic
  document.body.classList.toggle('dark-mode', darkMode.value)
}

const handleLogout = async () => {
  showDropdown.value = false
  showMobileMenu.value = false
  if (confirm('Yakin ingin logout?')) {
    await authStore.logout()
    router.push('/login')
  }
}

// Handle click outside dropdown
const handleClickOutside = (event) => {
  if (!event.target.closest('.dropdown') && !event.target.closest('.user-dropdown-toggle')) {
    showDropdown.value = false
  }
  if (!event.target.closest('.mobile-menu') && !event.target.closest('.nav-link')) {
    showMobileMenu.value = false
  }
}

// Handle fullscreen change
const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('fullscreenchange', handleFullscreenChange)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
})
</script>

<style scoped>
.main-header {
  background: white;
  border-bottom: 1px solid #dee2e6;
  padding: 0 15px;
  position: sticky;
  top: 0;
  z-index: 1035;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  min-height: 60px;
  display: flex;
  align-items: center;
}

.navbar-toggler.sidebar-toggler {
  border: none;
  background: transparent;
  font-size: 1.3rem;
  color: #495057;
  padding: 8px 12px;
  margin-right: 10px;
  display: none;
}

.navbar-nav {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 5px;
}

.nav-link {
  color: #495057;
  padding: 12px 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  border-radius: 6px;
  font-weight: 500;
}

.nav-link:hover {
  background: #f8f9fa;
  color: #007bff;
}

.nav-link i {
  font-size: 1.1rem;
}

.ml-auto {
  margin-left: auto;
}

/* User Dropdown */
.user-dropdown-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px !important;
}

.user-avatar-sm {
  width: 32px;
  height: 32px;
  background: #28a745;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
}

.user-name {
  font-weight: 600;
  color: #343a40;
}

.dropdown-arrow {
  font-size: 0.8rem;
  color: #6c757d;
  transition: transform 0.3s;
}

.dropdown.show .dropdown-arrow {
  transform: rotate(180deg);
}

/* Dropdown Menu */
.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  min-width: 280px;
  z-index: 1001;
  margin-top: 5px;
}

.dropdown-menu.show {
  display: block;
  animation: dropdownFadeIn 0.2s ease;
}

@keyframes dropdownFadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-header {
  padding: 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px 12px 0 0;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-avatar {
  width: 50px;
  height: 50px;
  background: #28a745;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.user-details {
  flex: 1;
}

.user-details strong {
  display: block;
  color: #343a40;
  margin-bottom: 2px;
}

.user-details small {
  display: block;
  color: #6c757d;
  margin-bottom: 5px;
}

.user-role {
  font-size: 0.75rem;
  padding: 3px 8px;
  border-radius: 12px;
  font-weight: 600;
}

.role-admin {
  background: #dc3545;
  color: white;
}

.role-user {
  background: #28a745;
  color: white;
}

.dropdown-divider {
  height: 0;
  margin: 0;
  overflow: hidden;
  border-top: 1px solid #e9ecef;
}

.dropdown-item {
  padding: 12px 20px;
  color: #495057;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  font-size: 0.9rem;
}

.dropdown-item:hover {
  background: #f8f9fa;
  color: #007bff;
}

.dropdown-item.text-danger:hover {
  background: #fee;
  color: #dc3545;
}

/* Mobile Styles */
.navbar-brand-mobile {
  display: none;
  font-weight: 700;
  color: #28a745;
  font-size: 1.1rem;
}

.date-badge {
  background: #e9ecef;
  border-radius: 20px;
  padding: 6px 12px !important;
  font-size: 0.8rem;
}

.navbar-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 0.7rem;
  padding: 2px 5px;
}

/* Mobile Menu */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1034;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.mobile-menu-overlay.active {
  opacity: 1;
  visibility: visible;
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: -300px;
  width: 280px;
  height: 100%;
  background: white;
  z-index: 1035;
  transition: right 0.3s ease;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
}

.mobile-menu.active {
  right: 0;
}

.mobile-menu-header {
  padding: 20px;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f9fa;
}

.mobile-menu-header h5 {
  margin: 0;
  color: #343a40;
}

.close-menu {
  border: none;
  background: none;
  font-size: 1.3rem;
  color: #6c757d;
  padding: 5px;
}

.mobile-menu-content {
  padding: 15px 0;
}

.mobile-menu-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 20px;
  color: #495057;
  text-decoration: none;
  transition: background 0.3s;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  font-size: 0.95rem;
}

.mobile-menu-item:hover {
  background: #f8f9fa;
  color: #007bff;
}

.mobile-menu-item.text-danger:hover {
  background: #fee;
  color: #dc3545;
}

/* Responsive Breakpoints */
@media (max-width: 991.98px) {
  .navbar-toggler.sidebar-toggler {
    display: block;
  }

  .navbar-brand-mobile {
    display: block;
  }

  .d-none.d-md-inline-block {
    display: none !important;
  }

  .nav-link .d-none.d-md-inline {
    display: none !important;
  }
}

@media (max-width: 767.98px) {
  .main-header {
    padding: 0 10px;
  }

  .nav-link {
    padding: 10px 12px;
    font-size: 0.9rem;
  }

  .d-none.d-sm-block {
    display: none !important;
  }

  .dropdown-menu {
    min-width: 250px;
    right: -10px;
  }
}

@media (max-width: 575.98px) {
  .navbar-brand-mobile {
    font-size: 1rem;
  }

  .user-name {
    display: none !important;
  }

  .dropdown-menu {
    min-width: 220px;
  }
}

/* Fullscreen styles */
:fullscreen .main-header {
  padding-right: 15px;
}
</style>