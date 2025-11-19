<template>
  <div class="dashboard-layout">
    <DashboardSidebar />
    
    <div class="dashboard-content">
      <DashboardHeader />
      
      <div class="content-wrapper">
        <section class="content-header">
          <div class="container-fluid">
            <h1>Activity Log</h1>
          </div>
        </section>

        <section class="content">
          <div class="container-fluid">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title"><i class="bi bi-clock-history"></i> Riwayat Aktivitas</h3>
              </div>
              <div class="card-body">
                <div class="alert alert-info">
                  <i class="bi bi-info-circle"></i>
                  <strong>Fitur Activity Log</strong> - Menampilkan riwayat semua aktivitas pengguna di sistem.
                  <br><small>Saat ini menampilkan aktivitas terbaru dari konten yang dibuat.</small>
                </div>

                <!-- Timeline -->
                <div class="timeline">
                  <!-- Blog Activities -->
                  <div v-for="blog in recentBlogs" :key="'blog-' + blog.id" class="timeline-item">
                    <div class="timeline-marker bg-success">
                      <i class="bi bi-newspaper"></i>
                    </div>
                    <div class="timeline-content">
                      <div class="timeline-header">
                        <strong>Artikel Baru</strong>
                        <span class="timeline-date">{{ formatDate(blog.created_at) }}</span>
                      </div>
                      <div class="timeline-body">
                        <h5>{{ blog.judul }}</h5>
                        <p>Oleh: {{ blog.nama_penulis }}</p>
                      </div>
                    </div>
                  </div>

                  <!-- Gallery Activities -->
                  <div v-for="gallery in recentGalleries" :key="'gallery-' + gallery.id" class="timeline-item">
                    <div class="timeline-marker bg-info">
                      <i class="bi bi-images"></i>
                    </div>
                    <div class="timeline-content">
                      <div class="timeline-header">
                        <strong>Foto Ditambahkan</strong>
                        <span class="timeline-date">{{ formatDate(gallery.created_at) }}</span>
                      </div>
                      <div class="timeline-body">
                        <p>{{ gallery.keterangan || 'Foto baru di galeri' }}</p>
                      </div>
                    </div>
                  </div>

                  <!-- Ecomap Activities -->
                  <div v-for="ecomap in recentEcomaps" :key="'ecomap-' + ecomap.id" class="timeline-item">
                    <div class="timeline-marker bg-warning">
                      <i class="bi bi-clipboard-data"></i>
                    </div>
                    <div class="timeline-content">
                      <div class="timeline-header">
                        <strong>Data Ecomap</strong>
                        <span class="timeline-date">{{ formatDate(ecomap.created_at) }}</span>
                      </div>
                      <div class="timeline-body">
                        <p>Input data sampah - {{ ecomap.desa?.nama_desa || 'Desa' }}</p>
                        <small>Total: {{ calculateTotal(ecomap) }} kg</small>
                      </div>
                    </div>
                  </div>

                  <div v-if="allActivities.length === 0" class="text-center py-5">
                    <i class="bi bi-inbox" style="font-size: 3rem; color: #ddd;"></i>
                    <p class="text-muted mt-3">Belum ada aktivitas</p>
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
import { ref, computed, onMounted } from 'vue'
import DashboardSidebar from '../../components/Dashboard/DashboardSidebar.vue'
import DashboardHeader from '../../components/Dashboard/DashboardHeader.vue'
import blogService from '../../services/blogService'
import galleryService from '../../services/galleryService'
import ecomapService from '../../services/ecomapService'

const recentBlogs = ref([])
const recentGalleries = ref([])
const recentEcomaps = ref([])

const allActivities = computed(() => {
  return [...recentBlogs.value, ...recentGalleries.value, ...recentEcomaps.value]
})

const fetchActivities = async () => {
  try {
    const [blogsRes, galleriesRes, ecomapsRes] = await Promise.all([
      blogService.getAll(),
      galleryService.getAll(),
      ecomapService.getAllEcomaps()
    ])

    // Get 5 recent items from each
    recentBlogs.value = blogsRes.data.slice(0, 5)
    recentGalleries.value = galleriesRes.data.slice(0, 5)
    recentEcomaps.value = ecomapsRes.data.slice(0, 5)
  } catch (error) {
    console.error('Error fetching activities:', error)
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const calculateTotal = (ecomap) => {
  return (parseFloat(ecomap.jumlah_organik || 0) + parseFloat(ecomap.jumlah_anorganik || 0) + parseFloat(ecomap.jumlah_residu || 0)).toFixed(1)
}

onMounted(() => {
  fetchActivities()
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

.card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

/* Timeline */
.timeline {
  position: relative;
  padding-left: 50px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #dee2e6;
}

.timeline-item {
  position: relative;
  margin-bottom: 30px;
}

.timeline-marker {
  position: absolute;
  left: -38px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  z-index: 1;
}

.timeline-content {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 15px;
  border-left: 3px solid #28a745;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.timeline-header strong {
  color: #343a40;
  font-size: 1rem;
}

.timeline-date {
  color: #6c757d;
  font-size: 0.85rem;
}

.timeline-body h5 {
  font-size: 1rem;
  font-weight: 600;
  color: #495057;
  margin: 5px 0;
}

.timeline-body p {
  margin: 0;
  color: #6c757d;
  font-size: 0.9rem;
}

.timeline-body small {
  color: #999;
}

@media (max-width: 992px) {
  .dashboard-content {
    margin-left: 70px;
  }

  .content {
    padding: 0 15px 15px;
  }
}
</style>