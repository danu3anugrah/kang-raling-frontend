<template>
  <div class="dashboard-layout">
    <DashboardSidebar />
    <div class="dashboard-content">
      <div class="content-wrapper">
        <section class="content-header">
          <div class="container-fluid">
            <h1>Dashboard</h1>
          </div>
        </section>

        <section class="content">
          <div class="container-fluid">
            <!-- Welcome Card -->
            <div class="welcome-card">
              <div class="welcome-icon">
                <i class="bi bi-hand-wave"></i>
              </div>
              <div class="welcome-text">
                <h2>Selamat Datang, {{ userName }}!</h2>
                <p v-if="isAdmin">Anda login sebagai <strong class="text-danger">Administrator</strong></p>
                <p v-else>Anda login sebagai <strong class="text-success">Fasilitator</strong></p>
                <small class="text-white-50">
                  <i class="bi bi-calendar3"></i> {{ currentDate }}
                </small>
              </div>
            </div>

            <!-- Stats Row -->
            <div class="row">
              <!-- Total Blogs -->
              <div class="col-lg-3 col-6">
                <div class="small-box bg-success">
                  <div class="inner">
                    <h3>{{ totalBlogs }}</h3>
                    <p>Total Artikel Blog</p>
                  </div>
                  <div class="icon">
                    <i class="bi bi-newspaper"></i>
                  </div>
                  <router-link to="/dashboard/blog" class="small-box-footer">
                    Kelola <i class="bi bi-arrow-right-circle"></i>
                  </router-link>
                </div>
              </div>

              <!-- Total Galleries -->
              <div class="col-lg-3 col-6">
                <div class="small-box bg-info">
                  <div class="inner">
                    <h3>{{ totalGalleries }}</h3>
                    <p>Total Foto Gallery</p>
                  </div>
                  <div class="icon">
                    <i class="bi bi-images"></i>
                  </div>
                  <router-link to="/dashboard/gallery" class="small-box-footer">
                    Kelola <i class="bi bi-arrow-right-circle"></i>
                  </router-link>
                </div>
              </div>

              <!-- Total Ecomaps -->
              <div class="col-lg-3 col-6">
                <div class="small-box bg-warning">
                  <div class="inner">
                    <h3>{{ totalEcomaps }}</h3>
                    <p>Total Data Ecomap</p>
                  </div>
                  <div class="icon">
                    <i class="bi bi-geo-alt"></i>
                  </div>
                  <router-link to="/dashboard/ecomap" class="small-box-footer">
                    Kelola <i class="bi bi-arrow-right-circle"></i>
                  </router-link>
                </div>
              </div>

              <!-- Total Users (Admin Only) -->
              <div class="col-lg-3 col-6" v-if="isAdmin">
                <div class="small-box bg-danger">
                  <div class="inner">
                    <h3>{{ totalUsers }}</h3>
                    <p>Total User</p>
                  </div>
                  <div class="icon">
                    <i class="bi bi-people"></i>
                  </div>
                  <router-link to="/dashboard/users" class="small-box-footer">
                    Kelola <i class="bi bi-arrow-right-circle"></i>
                  </router-link>
                </div>
              </div>

              <!-- Total Desa (Fasilitator) -->
              <div class="col-lg-3 col-6" v-else>
                <div class="small-box bg-primary">
                  <div class="inner">
                    <h3>{{ totalDesas }}</h3>
                    <p>Total Desa Binaan</p>
                  </div>
                  <div class="icon">
                    <i class="bi bi-pin-map"></i>
                  </div>
                  <router-link to="/dashboard/ecomap" class="small-box-footer">
                    Lihat <i class="bi bi-arrow-right-circle"></i>
                  </router-link>
                </div>
              </div>
            </div>

            <!-- Charts Row -->
            <div class="row">
              <!-- Statistik Konten -->
              <div class="col-lg-6">
                <div class="card">
                  <div class="card-header">
                    <h3 class="card-title"><i class="bi bi-bar-chart"></i> Statistik Konten</h3>
                  </div>
                  <div class="card-body">
                    <canvas ref="contentChart"></canvas>
                  </div>
                </div>
              </div>

              <!-- Statistik Sampah per Desa -->
              <div class="col-lg-6">
                <div class="card">
                  <div class="card-header">
                    <h3 class="card-title"><i class="bi bi-pie-chart"></i> Total Sampah per Desa</h3>
                  </div>
                  <div class="card-body">
                    <canvas ref="wasteChart"></canvas>
                  </div>
                </div>
              </div>
            </div>

            <!-- Recent Activity -->
            <div class="row">
              <div class="col-lg-8">
                <div class="card">
                  <div class="card-header">
                    <h3 class="card-title"><i class="bi bi-clock-history"></i> Aktivitas Terbaru</h3>
                  </div>
                  <div class="card-body">
                    <div class="activity-timeline">
                      <div class="activity-item">
                        <div class="activity-icon bg-success">
                          <i class="bi bi-newspaper"></i>
                        </div>
                        <div class="activity-content">
                          <h4>Artikel Baru Dipublikasikan</h4>
                          <p>{{ latestBlog?.judul || 'Belum ada artikel' }}</p>
                          <small class="text-muted">{{ formatRelativeTime(latestBlog?.created_at) }}</small>
                        </div>
                      </div>

                      <div class="activity-item">
                        <div class="activity-icon bg-info">
                          <i class="bi bi-images"></i>
                        </div>
                        <div class="activity-content">
                          <h4>Foto Baru Ditambahkan</h4>
                          <p>{{ latestGallery?.keterangan || 'Belum ada foto' }}</p>
                          <small class="text-muted">{{ formatRelativeTime(latestGallery?.created_at) }}</small>
                        </div>
                      </div>

                      <div class="activity-item">
                        <div class="activity-icon bg-warning">
                          <i class="bi bi-clipboard-data"></i>
                        </div>
                        <div class="activity-content">
                          <h4>Data Ecomap Diperbarui</h4>
                          <p>Total {{ totalEcomaps }} data pencatatan sampah</p>
                          <small class="text-muted">{{ formatRelativeTime(latestEcomap?.created_at) }}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Quick Actions -->
              <div class="col-lg-4">
                <div class="card">
                  <div class="card-header">
                    <h3 class="card-title"><i class="bi bi-lightning"></i> Quick Actions</h3>
                  </div>
                  <div class="card-body">
                    <div class="quick-actions-vertical">
                      <router-link to="/dashboard/blog" class="quick-action-btn bg-success">
                        <i class="bi bi-plus-circle"></i>
                        <span>Tambah Artikel</span>
                      </router-link>
                      <router-link to="/dashboard/gallery" class="quick-action-btn bg-info">
                        <i class="bi bi-upload"></i>
                        <span>Upload Foto</span>
                      </router-link>
                      <router-link to="/dashboard/ecomap" class="quick-action-btn bg-warning">
                        <i class="bi bi-clipboard-data"></i>
                        <span>Input Data Sampah</span>
                      </router-link>
                      <router-link v-if="isAdmin" to="/dashboard/users" class="quick-action-btn bg-danger">
                        <i class="bi bi-person-plus"></i>
                        <span>Tambah User</span>
                      </router-link>
                      <router-link to="/" class="quick-action-btn bg-primary">
                        <i class="bi bi-eye"></i>
                        <span>Lihat Website</span>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useAuthStore } from '../../stores/auth'
import DashboardSidebar from '../../components/Dashboard/DashboardSidebar.vue'
import DashboardHeader from '../../components/Dashboard/DashboardHeader.vue'
import blogService from '../../services/blogService'
import galleryService from '../../services/galleryService'
import ecomapService from '../../services/ecomapService'
import userService from '../../services/userService'
import Chart from 'chart.js/auto'

const authStore = useAuthStore()
const userName = computed(() => authStore.userName)
const isAdmin = computed(() => authStore.isAdmin)

const totalBlogs = ref(0)
const totalGalleries = ref(0)
const totalEcomaps = ref(0)
const totalDesas = ref(0)
const totalUsers = ref(0)

const latestBlog = ref(null)
const latestGallery = ref(null)
const latestEcomap = ref(null)

const contentChart = ref(null)
const wasteChart = ref(null)
let contentChartInstance = null
let wasteChartInstance = null

const currentDate = computed(() => {
  return new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const fetchStats = async () => {
  try {
    const [blogsRes, galleriesRes, ecomapsRes, desasRes] = await Promise.all([
      blogService.getAll(),
      galleryService.getAll(),
      ecomapService.getAllEcomaps(),
      ecomapService.getAllDesas()
    ])
    
    totalBlogs.value = blogsRes.data.length
    totalGalleries.value = galleriesRes.data.length
    totalEcomaps.value = ecomapsRes.data.length
    totalDesas.value = desasRes.data.length

    // Latest items
    latestBlog.value = blogsRes.data[0]
    latestGallery.value = galleriesRes.data[0]
    latestEcomap.value = ecomapsRes.data[0]

    // Fetch users only if admin
    if (isAdmin.value) {
      const usersRes = await userService.getAll()
      totalUsers.value = usersRes.data.length
    }

    // Create charts after data loaded
    await nextTick()
    createCharts(ecomapsRes.data, desasRes.data)
  } catch (error) {
    console.error('Error fetching stats:', error)
  }
}

const createCharts = (ecomaps, desas) => {
  // Content Chart
  if (contentChart.value) {
    if (contentChartInstance) contentChartInstance.destroy()
    
    contentChartInstance = new Chart(contentChart.value, {
      type: 'bar',
      data: {
        labels: ['Blog', 'Gallery', 'Ecomap', 'Desa'],
        datasets: [{
          label: 'Jumlah Data',
          data: [totalBlogs.value, totalGalleries.value, totalEcomaps.value, totalDesas.value],
          backgroundColor: ['#28a745', '#17a2b8', '#ffc107', '#007bff']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    })
  }

  // Waste Chart
  if (wasteChart.value && desas.length > 0) {
    if (wasteChartInstance) wasteChartInstance.destroy()

    const desaData = desas.map(desa => {
      const desaEcomaps = ecomaps.filter(e => e.desa_id === desa.id)
      const total = desaEcomaps.reduce((sum, e) => {
        return sum + parseFloat(e.jumlah_organik || 0) + parseFloat(e.jumlah_anorganik || 0) + parseFloat(e.jumlah_residu || 0)
      }, 0)
      return { desa: desa.nama_desa, total }
    })

    wasteChartInstance = new Chart(wasteChart.value, {
      type: 'pie',
      data: {
        labels: desaData.map(d => d.desa),
        datasets: [{
          data: desaData.map(d => d.total),
          backgroundColor: ['#28a745', '#17a2b8', '#ffc107', '#dc3545', '#007bff', '#6c757d']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true
      }
    })
  }
}

const formatRelativeTime = (date) => {
  if (!date) return 'Baru saja'
  
  const now = new Date()
  const then = new Date(date)
  const diff = now - then
  
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  
  if (minutes < 1) return 'Baru saja'
  if (minutes < 60) return `${minutes} menit yang lalu`
  if (hours < 24) return `${hours} jam yang lalu`
  return `${days} hari yang lalu`
}

onMounted(() => {
  fetchStats()
})
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background: #f4f6f9;
}

.dashboard-content {
  flex: 1;
  margin-left: 250px;
  transition: margin-left 0.3s;
}

.content-wrapper {
  padding: 0;
}

.content-header {
  padding: 20px 30px;
  background: white;
  border-bottom: 1px solid #dee2e6;
  margin-bottom: 20px;
}

.content-header h1 {
  font-size: 1.8rem;
  font-weight: 600;
  color: #343a40;
  margin: 0;
}

.content {
  padding: 0 30px 30px;
}

/* Welcome Card */
.welcome-card {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  padding: 30px;
  border-radius: 10px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.welcome-icon {
  font-size: 3rem;
  animation: wave 1s ease-in-out infinite;
}

@keyframes wave {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(20deg); }
  75% { transform: rotate(-20deg); }
}

.welcome-text h2 {
  margin: 0 0 5px 0;
  font-size: 1.8rem;
  font-weight: 700;
}

.welcome-text p {
  margin: 0;
  opacity: 0.95;
}

/* Small Box (AdminLTE Style) */
.small-box {
  position: relative;
  display: block;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  color: white;
}

.small-box .inner {
  padding: 20px;
}

.small-box .inner h3 {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 10px 0;
}

.small-box .inner p {
  font-size: 1rem;
  margin: 0;
  opacity: 0.9;
}

.small-box .icon {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 5rem;
  opacity: 0.2;
  transition: transform 0.3s;
}

.small-box:hover .icon {
  transform: scale(1.1);
}

.small-box-footer {
  display: block;
  padding: 10px;
  text-align: center;
  background: rgba(0, 0, 0, 0.1);
  color: white;
  text-decoration: none;
  border-radius: 0 0 10px 10px;
  transition: background 0.3s;
}

.small-box-footer:hover {
  background: rgba(0, 0, 0, 0.2);
  color: white;
}

.bg-success { background: #28a745; }
.bg-info { background: #17a2b8; }
.bg-warning { background: #ffc107; color: #333; }
.bg-danger { background: #dc3545; }
.bg-primary { background: #007bff; }

.bg-warning .small-box-footer {
  color: #333;
}

/* Card */
.card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.card-header {
  padding: 15px 20px;
  border-bottom: 1px solid #dee2e6;
  background: #f8f9fa;
  border-radius: 10px 10px 0 0;
}

.card-title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #343a40;
  display: flex;
  align-items: center;
  gap: 10px;
}

.card-body {
  padding: 20px;
}

/* Quick Actions */
.quick-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.quick-action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 25px;
  border-radius: 10px;
  color: white;
  text-decoration: none;
  transition: all 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.quick-action-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  color: white;
}

.quick-action-btn i {
  font-size: 2.5rem;
}

.quick-action-btn span {
  font-weight: 600;
  font-size: 1rem;
}

/* Responsive */
@media (max-width: 992px) {
  .dashboard-content {
    margin-left: 70px;
  }

  .welcome-card {
    flex-direction: column;
    text-align: center;
  }

  .content {
    padding: 0 15px 15px;
  }

  .small-box .icon {
    font-size: 3rem;
  }
}

/* Activity Timeline */
.activity-timeline {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.activity-item {
  display: flex;
  gap: 15px;
  align-items: start;
}

.activity-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.3rem;
  flex-shrink: 0;
}

.activity-content h4 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 5px 0;
  color: #343a40;
}

.activity-content p {
  margin: 0 0 5px 0;
  color: #6c757d;
}

.quick-actions-vertical {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.quick-actions-vertical .quick-action-btn {
  flex-direction: row;
  padding: 15px 20px;
  justify-content: flex-start;
}

.quick-actions-vertical .quick-action-btn i {
  font-size: 1.5rem;
}

.text-white-50 {
  color: rgba(255, 255, 255, 0.7);
}
</style>