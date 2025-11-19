<template>
  <!-- Tambahkan toggle button untuk mobile -->
  <div class="sidebar-overlay" :class="{ 'active': isSidebarOpen }" @click="closeSidebar"></div>
  
  <aside class="main-sidebar sidebar-dark-primary elevation-4" :class="{ 'sidebar-collapsed': isCollapsed, 'sidebar-mobile-open': isSidebarOpen }">
    <!-- Toggle Button -->
    <div class="sidebar-toggle" @click="toggleSidebar">
      <i class="bi bi-list"></i>
    </div>

    <!-- Brand Logo -->
    <router-link to="/dashboard" class="brand-link">
      <img src="@/assets/images/logo_kangraling.webp" alt="Kang Raling Logo" class="brand-image img-circle elevation-3">
      <span class="brand-text font-weight-light">Kang Raling</span>
      <i class="bi bi-chevron-left collapse-icon" @click.prevent="toggleCollapse"></i>
    </router-link>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <div class="user-avatar">
            <i class="bi bi-person-circle"></i>
          </div>
        </div>
        <div class="info">
          <router-link to="/dashboard" class="d-block">{{ userName }}</router-link>
          <small :class="roleClass">{{ roleLabel }}</small>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">
          
          <!-- Dashboard -->
          <li class="nav-item">
            <router-link to="/dashboard" class="nav-link" exact-active-class="active">
              <i class="nav-icon bi bi-speedometer2"></i>
              <p>Dashboard</p>
            </router-link>
          </li>

          <!-- ADMIN ONLY SECTION -->
          <template v-if="isAdmin">
            <li class="nav-header">ADMIN</li>

            <!-- User Management -->
            <li class="nav-item">
              <router-link to="/dashboard/users" class="nav-link" active-class="active">
                <i class="nav-icon bi bi-people"></i>
                <p>
                  Kelola User
                  <span class="right badge badge-danger">Admin</span>
                </p>
              </router-link>
            </li>

            <!-- Activity Log -->
            <li class="nav-item">
              <router-link to="/dashboard/activity-log" class="nav-link" active-class="active">
                <i class="nav-icon bi bi-clock-history"></i>
                <p>Activity Log</p>
              </router-link>
            </li>
          </template>

          <!-- CONTENT MANAGEMENT (Semua User) -->
          <li class="nav-header">KONTEN</li>

          <!-- Blog -->
          <li class="nav-item">
            <router-link to="/dashboard/blog" class="nav-link" active-class="active">
              <i class="nav-icon bi bi-newspaper"></i>
              <p>
                Kelola Blog
                <span class="right badge badge-success">{{ blogCount }}</span>
              </p>
            </router-link>
          </li>

          <!-- Gallery -->
          <li class="nav-item">
            <router-link to="/dashboard/gallery" class="nav-link" active-class="active">
              <i class="nav-icon bi bi-images"></i>
              <p>
                Kelola Gallery
                <span class="right badge badge-info">{{ galleryCount }}</span>
              </p>
            </router-link>
          </li>

          <!-- Ecomap -->
          <li class="nav-item">
            <router-link to="/dashboard/ecomap" class="nav-link" active-class="active">
              <i class="nav-icon bi bi-geo-alt"></i>
              <p>
                Kelola Ecomap
                <span class="right badge badge-warning">{{ ecomapCount }}</span>
              </p>
            </router-link>
          </li>

          <!-- Divider -->
          <li class="nav-header">PENGATURAN</li>

          <!-- Settings -->
          <li class="nav-item">
            <router-link to="/dashboard/settings" class="nav-link" active-class="active">
              <i class="nav-icon bi bi-gear"></i>
              <p>Pengaturan Akun</p>
            </router-link>
          </li>

          <!-- Divider -->
          <li class="nav-header">LAINNYA</li>

          <!-- View Website -->
          <li class="nav-item">
            <router-link to="/" class="nav-link">
              <i class="nav-icon bi bi-house"></i>
              <p>Lihat Website</p>
            </router-link>
          </li>

          <!-- Logout -->
          <li class="nav-item">
            <a href="#" class="nav-link text-danger" @click.prevent="handleLogout">
              <i class="nav-icon bi bi-box-arrow-right"></i>
              <p>Logout</p>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import blogService from '../../services/blogService'
import galleryService from '../../services/galleryService'
import ecomapService from '../../services/ecomapService'

const router = useRouter()
const authStore = useAuthStore()

// State untuk responsive
const isCollapsed = ref(false)
const isSidebarOpen = ref(false)
const windowWidth = ref(window.innerWidth)

const userName = computed(() => authStore.userName)
const isAdmin = computed(() => authStore.isAdmin)
const roleLabel = computed(() => isAdmin.value ? 'Administrator' : 'Fasilitator')
const roleClass = computed(() => isAdmin.value ? 'text-danger' : 'text-success')

const blogCount = ref(0)
const galleryCount = ref(0)
const ecomapCount = ref(0)

// Toggle sidebar collapse
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

// Toggle sidebar mobile
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

// Close sidebar mobile
const closeSidebar = () => {
  isSidebarOpen.value = false
}

// Handle window resize
const handleResize = () => {
  windowWidth.value = window.innerWidth
  if (windowWidth.value >= 992) {
    isSidebarOpen.value = false
  }
}

const fetchCounts = async () => {
  try {
    const [blogs, galleries, ecomaps] = await Promise.all([
      blogService.getAll(),
      galleryService.getAll(),
      ecomapService.getAllEcomaps()
    ])
    blogCount.value = blogs.data.length
    galleryCount.value = galleries.data.length
    ecomapCount.value = ecomaps.data.length
  } catch (error) {
    console.error('Error fetching counts:', error)
  }
}

const handleLogout = async () => {
  if (confirm('Yakin ingin logout?')) {
    await authStore.logout()
    router.push('/login')
  }
}

onMounted(() => {
  fetchCounts()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
/* AdminLTE Style Sidebar */
.main-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 250px;
  background: #343a40;
  overflow-y: auto;
  z-index: 1030;
  transition: all 0.3s ease;
}

/* Sidebar Collapsed State */
.sidebar-collapsed {
  width: 70px;
}

.sidebar-collapsed .brand-text,
.sidebar-collapsed .user-panel .info,
.sidebar-collapsed .nav-link p,
.sidebar-collapsed .nav-header,
.sidebar-collapsed .badge {
  display: none;
}

.sidebar-collapsed .brand-link {
  justify-content: center;
  padding: 15px 10px;
}

.sidebar-collapsed .user-avatar {
  margin: 0 auto;
}

.sidebar-collapsed .nav-link {
  justify-content: center;
  padding: 12px 10px;
}

.sidebar-collapsed .collapse-icon {
  transform: rotate(180deg);
}

/* Mobile Sidebar */
@media (max-width: 991.98px) {
  .main-sidebar {
    transform: translateX(-100%);
    width: 250px;
  }

  .sidebar-mobile-open {
    transform: translateX(0);
    box-shadow: 3px 0 15px rgba(0, 0, 0, 0.3);
  }

  .sidebar-collapsed.sidebar-mobile-open {
    width: 250px;
  }

  .sidebar-collapsed.sidebar-mobile-open .brand-text,
  .sidebar-collapsed.sidebar-mobile-open .user-panel .info,
  .sidebar-collapsed.sidebar-mobile-open .nav-link p,
  .sidebar-collapsed.sidebar-mobile-open .nav-header,
  .sidebar-collapsed.sidebar-mobile-open .badge {
    display: block;
  }

  .sidebar-collapsed.sidebar-mobile-open .nav-link {
    justify-content: flex-start;
    padding: 12px 15px;
  }
}

/* Sidebar Overlay untuk Mobile */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1029;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.sidebar-overlay.active {
  opacity: 1;
  visibility: visible;
}

/* Sidebar Toggle Button */
.sidebar-toggle {
  position: fixed;
  top: 15px;
  left: 15px;
  z-index: 1028;
  background: #343a40;
  color: white;
  border: none;
  border-radius: 4px;
  width: 40px;
  height: 40px;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

@media (max-width: 991.98px) {
  .sidebar-toggle {
    display: flex;
  }
}

.brand-link {
  display: flex;
  align-items: center;
  padding: 15px;
  background: #28a745;
  color: white;
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: background 0.3s;
  position: relative;
}

.brand-link:hover {
  background: #218838;
}

.brand-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: contain;
  background: white;
  padding: 3px;
}

.brand-text {
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  transition: opacity 0.3s;
}

.collapse-icon {
  position: absolute;
  right: 15px;
  color: white;
  cursor: pointer;
  transition: transform 0.3s;
}

.elevation-3 {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
}

.elevation-4 {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.sidebar {
  padding: 0;
}

/* User Panel */
.user-panel {
  border-bottom: 1px solid #4f5962;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px;
  transition: all 0.3s;
}

.user-avatar {
  width: 45px;
  height: 45px;
  background: #28a745;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.8rem;
  transition: all 0.3s;
}

.info {
  flex: 1;
  transition: opacity 0.3s;
}

.info a {
  color: white;
  text-decoration: none;
  font-weight: 600;
  display: block;
}

.info small {
  color: #c2c7d0;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.text-danger {
  color: #dc3545 !important;
}

.text-success {
  color: #28a745 !important;
}

/* Sidebar Menu */
.nav-sidebar {
  padding: 0;
  margin: 0;
  list-style: none;
}

.nav-header {
  padding: 15px 15px 10px;
  color: #8a93a2;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 10px;
  transition: opacity 0.3s;
}

.nav-item {
  margin: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  color: #c2c7d0;
  text-decoration: none;
  transition: all 0.3s;
  position: relative;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-link.active {
  background: #28a745;
  color: white;
  font-weight: 600;
}

.nav-link.text-danger:hover {
  background: #dc3545;
  color: white;
}

.nav-icon {
  width: 25px;
  text-align: center;
  font-size: 1.2rem;
  margin-right: 10px;
  flex-shrink: 0;
}

.nav-link p {
  margin: 0;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: opacity 0.3s;
}

.badge {
  font-size: 0.7rem;
  padding: 3px 8px;
  border-radius: 10px;
  font-weight: 600;
  transition: opacity 0.3s;
}

.badge-success {
  background: #28a745;
  color: white;
}

.badge-info {
  background: #17a2b8;
  color: white;
}

.badge-warning {
  background: #ffc107;
  color: #333;
}

.badge-danger {
  background: #dc3545;
  color: white;
}

/* Scrollbar */
.main-sidebar::-webkit-scrollbar {
  width: 6px;
}

.main-sidebar::-webkit-scrollbar-track {
  background: #2c3136;
}

.main-sidebar::-webkit-scrollbar-thumb {
  background: #4f5962;
  border-radius: 3px;
}

.main-sidebar::-webkit-scrollbar-thumb:hover {
  background: #5a6268;
}
</style>