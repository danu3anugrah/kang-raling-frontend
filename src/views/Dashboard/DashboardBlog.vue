<!-- 
    KOMPONEN DASHBOARD BLOG MANAGEMENT
    Deskripsi: Halaman untuk mengelola artikel blog Kang Raling (CRUD operations)
    Tanggal: [15/11/2024]
    Developer: [Danu Tri Anugrah]
    API Endpoints:
      - GET /api/blogs - Ambil semua blog
      - POST /api/blogs - Buat blog baru
      - PUT /api/blogs/{id} - Update blog
      - DELETE /api/blogs/{id} - Hapus blog
-->
<template>
  <div class="dashboard-layout">
    
    <div class="dashboard-content">
      <DashboardHeader />
      
      <div class="main-content">
        <!-- Header Section -->
        <div class="content-header">
          <div class="header-title">
            <h1>
              <i class="bi bi-newspaper"></i>
              Kelola Blog
            </h1>
            <p>Kelola artikel dan berita Kang Raling</p>
          </div>
          <button class="btn-primary" @click="openCreateModal">
            <i class="bi bi-plus-circle"></i> 
            <span>Tambah Artikel</span>
          </button>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Memuat artikel...</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="blogs.length === 0" class="empty-state">
          <div class="empty-icon">
            <i class="bi bi-newspaper"></i>
          </div>
          <h3>Belum ada artikel</h3>
          <p>Mulai dengan membuat artikel pertama Anda</p>
          <button class="btn-primary" @click="openCreateModal">
            <i class="bi bi-plus-circle"></i> 
            Tambah Artikel Pertama
          </button>
        </div>

        <!-- Blog Table -->
        <div v-else class="table-container">
          <div class="table-responsive">
            <table class="blog-table">
              <thead>
                <tr>
                  <th class="image-column">Gambar</th>
                  <th class="title-column">Judul</th>
                  <th class="author-column">Penulis</th>
                  <th class="date-column">Tanggal</th>
                  <th class="actions-column">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="blog in blogs" :key="blog.id" class="blog-row">
                  <td class="image-cell">
                    <img 
                      :src="getImageUrl(blog.gambar)" 
                      :alt="blog.judul"
                      class="blog-thumbnail"
                      @error="handleImageError"
                    />
                  </td>
                  <td class="title-cell">
                    <div class="blog-title">{{ blog.judul }}</div>
                  </td>
                  <td class="author-cell">
                    <div class="blog-author">{{ blog.nama_penulis }}</div>
                  </td>
                  <td class="date-cell">
                    <div class="blog-date">{{ formatDate(blog.created_at) }}</div>
                  </td>
                  <td class="actions-cell">
                    <div class="action-buttons">
                      <button 
                        class="btn-edit" 
                        @click="openEditModal(blog)"
                        title="Edit Artikel"
                      >
                        <i class="bi bi-pencil"></i>
                      </button>
                      <button 
                        class="btn-delete" 
                        @click="deleteBlog(blog.id)"
                        title="Hapus Artikel"
                      >
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-container">
        <div class="modal-header">
          <h2>{{ isEdit ? 'Edit Artikel' : 'Tambah Artikel Baru' }}</h2>
          <button class="btn-close" @click="closeModal" title="Tutup">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <form @submit.prevent="submitForm" class="blog-form">
            <!-- Image Upload -->
            <div class="form-group">
              <label class="form-label">Gambar Artikel</label>
              <div class="file-upload-container">
                <input 
                  type="file" 
                  class="file-input" 
                  @change="handleFileChange"
                  accept="image/*"
                  :required="!isEdit"
                  id="blog-image"
                />
                <label for="blog-image" class="file-upload-label">
                  <i class="bi bi-cloud-upload"></i>
                  <span>{{ selectedFile ? selectedFile.name : 'Pilih gambar...' }}</span>
                </label>
              </div>
              <div class="file-info">
                <small>Format: JPG, PNG, WEBP (Maksimal 2MB)</small>
              </div>
              
              <!-- Image Preview -->
              <div v-if="imagePreview" class="image-preview">
                <img :src="imagePreview" alt="Preview" class="preview-image" />
                <button 
                  type="button" 
                  class="btn-remove-preview" 
                  @click="removeImagePreview"
                  title="Hapus gambar"
                >
                  <i class="bi bi-x"></i>
                </button>
              </div>
              <div v-else-if="isEdit && form.gambar" class="image-preview">
                <img :src="getImageUrl(form.gambar)" alt="Current" class="preview-image" />
              </div>
            </div>

            <!-- Title Input -->
            <div class="form-group">
              <label class="form-label">Judul Artikel</label>
              <input 
                type="text" 
                class="form-input" 
                v-model="form.judul"
                required
                placeholder="Masukkan judul artikel yang menarik"
                maxlength="200"
              />
              <div class="char-counter">{{ form.judul.length }}/200</div>
            </div>

            <!-- Author Input -->
            <div class="form-group">
              <label class="form-label">Nama Penulis</label>
              <input 
                type="text" 
                class="form-input" 
                v-model="form.nama_penulis"
                required
                placeholder="Masukkan nama penulis"
                maxlength="100"
              />
              <div class="char-counter">{{ form.nama_penulis.length }}/100</div>
            </div>

            <!-- Content Textarea -->
            <div class="form-group">
              <label class="form-label">Isi Berita</label>
              <textarea 
                class="form-textarea" 
                v-model="form.isi_berita"
                rows="8"
                required
                placeholder="Tulis isi artikel yang informatif dan menarik..."
                maxlength="5000"
              ></textarea>
              <div class="char-counter">{{ form.isi_berita.length }}/5000</div>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="error-message">
              <i class="bi bi-exclamation-triangle"></i>
              {{ error }}
            </div>

            <!-- Form Actions -->
            <div class="form-actions">
              <button 
                type="button" 
                class="btn-secondary" 
                @click="closeModal"
                :disabled="submitting"
              >
                Batal
              </button>
              <button 
                type="submit" 
                class="btn-primary" 
                :disabled="submitting"
              >
                <span v-if="submitting" class="loading-text">
                  <i class="bi bi-arrow-repeat"></i>
                  Menyimpan...
                </span>
                <span v-else>
                  {{ isEdit ? 'Update Artikel' : 'Simpan Artikel' }}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// IMPORT COMPOSABLE FUNCTIONS
import { onMounted } from 'vue'
import { useBlogManagement } from '@/scripts/dashboard/dashboardblog.js'

// IMPORT COMPONENTS
import DashboardSidebar from '@/components/Dashboard/DashboardSidebar.vue'
import DashboardHeader from '@/components/Dashboard/DashboardHeader.vue'

// IMPORT CSS
import '@/assets/css/dashboard/dashboardblog.css'

// USE COMPOSABLE
const {
  // State
  blogs,
  loading,
  showModal,
  isEdit,
  submitting,
  error,
  selectedFile,
  imagePreview,
  form,
  
  // Methods
  fetchBlogs,
  openCreateModal,
  openEditModal,
  closeModal,
  handleFileChange,
  removeImagePreview,
  handleImageError,
  submitForm,
  deleteBlog,
  getImageUrl,
  formatDate
} = useBlogManagement()

// LIFECYCLE HOOKS
onMounted(() => {
  fetchBlogs()
})
</script>