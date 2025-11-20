<!-- 
    KOMPONEN DASHBOARD GALLERY MANAGEMENT
    Deskripsi: Halaman untuk mengelola galeri foto Kang Raling (CRUD operations)
    Tanggal: [15/11/2024]
    Developer: [Danu Tri Anugrah]
    API Endpoints:
      - GET /api/galleries - Ambil semua galeri
      - POST /api/galleries - Upload foto baru
      - PUT /api/galleries/{id} - Update foto
      - DELETE /api/galleries/{id} - Hapus foto
-->
<template>
  <div class="dashboard-layout">
    
    <div class="dashboard-content">
      
      
      <div class="main-content">
        <!-- Header Section -->
        <div class="content-header">
          <div class="header-title">
            <h1>
              <i class="bi bi-images"></i>
              Kelola Gallery
            </h1>
            <p>Kelola foto dokumentasi kegiatan Kang Raling</p>
          </div>
          <button class="btn-primary" @click="openCreateModal">
            <i class="bi bi-plus-circle"></i> 
            <span>Upload Foto</span>
          </button>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Memuat galeri foto...</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="galleries.length === 0" class="empty-state">
          <div class="empty-icon">
            <i class="bi bi-images"></i>
          </div>
          <h3>Belum ada foto di galeri</h3>
          <p>Mulai dengan mengupload foto pertama Anda</p>
          <button class="btn-primary" @click="openCreateModal">
            <i class="bi bi-plus-circle"></i> 
            Upload Foto Pertama
          </button>
        </div>

        <!-- Gallery Grid -->
        <div v-else class="gallery-grid">
          <div 
            v-for="gallery in galleries" 
            :key="gallery.id" 
            class="gallery-card"
          >
            <div class="gallery-image-container">
              <img 
                :src="getImageUrl(gallery.gambar)" 
                :alt="gallery.keterangan || 'Foto Kang Raling'"
                class="gallery-image"
                @error="handleImageError"
                loading="lazy"
              />
              <div class="gallery-overlay">
                <div class="gallery-actions">
                  <button 
                    class="btn-edit" 
                    @click="openEditModal(gallery)"
                    title="Edit Foto"
                  >
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button 
                    class="btn-delete" 
                    @click="deleteGallery(gallery.id)"
                    title="Hapus Foto"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
            
            <div class="gallery-info">
              <p class="gallery-caption">
                {{ gallery.keterangan || 'Tanpa keterangan' }}
              </p>
              <div class="gallery-meta">
                <i class="bi bi-calendar3"></i>
                <span class="gallery-date">{{ formatDate(gallery.created_at) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-container">
        <div class="modal-header">
          <h2>{{ isEdit ? 'Edit Foto' : 'Upload Foto Baru' }}</h2>
          <button class="btn-close" @click="closeModal" title="Tutup">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <form @submit.prevent="submitForm" class="gallery-form">
            <!-- Image Upload -->
            <div class="form-group">
              <label class="form-label">Foto</label>
              <div class="file-upload-container">
                <input 
                  type="file" 
                  class="file-input" 
                  @change="handleFileChange"
                  accept="image/*"
                  :required="!isEdit"
                  id="gallery-image"
                />
                <label for="gallery-image" class="file-upload-label">
                  <i class="bi bi-cloud-upload"></i>
                  <span>{{ selectedFile ? selectedFile.name : 'Pilih foto...' }}</span>
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
                  title="Hapus foto"
                >
                  <i class="bi bi-x"></i>
                </button>
              </div>
              <div v-else-if="isEdit && form.gambar" class="image-preview">
                <img :src="getImageUrl(form.gambar)" alt="Current" class="preview-image" />
              </div>
            </div>

            <!-- Caption Input -->
            <div class="form-group">
              <label class="form-label">Keterangan</label>
              <textarea 
                class="form-textarea" 
                v-model="form.keterangan"
                rows="3"
                placeholder="Tulis keterangan foto (opsional)"
                maxlength="500"
              ></textarea>
              <div class="char-counter">{{ form.keterangan.length }}/500</div>
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
                  {{ isEdit ? 'Mengupdate...' : 'Mengupload...' }}
                </span>
                <span v-else>
                  {{ isEdit ? 'Update Foto' : 'Upload Foto' }}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * DASHBOARD GALLERY VUE COMPONENT
 * File: DashboardGallery.vue
 * Deskripsi: Komponen utama untuk manajemen galeri foto
 */

import { ref, onMounted } from 'vue'
import DashboardHeader from '@/components/Dashboard/DashboardHeader.vue'
import { 
  useGallery, 
  useModal, 
  useFileHandling, 
  useForm 
} from '@/scripts/dashboard/dashboardgallery.js'

export default {
  name: 'DashboardGallery',
  components: {
    DashboardHeader
  },
  setup() {
    // Import composables dari file JavaScript terpisah
    const {
      galleries,
      loading,
      fetchGalleries,
      createGallery,
      updateGallery,
      deleteGalleryData
    } = useGallery()

    const {
      showModal,
      isEdit,
      openCreateModal,
      openEditModal,
      closeModal
    } = useModal()

    const {
      selectedFile,
      imagePreview,
      handleFileChange,
      removeImagePreview,
      handleImageError
    } = useFileHandling()

    const {
      form,
      submitting,
      error,
      submitForm,
      deleteGallery,
      resetForm
    } = useForm({
      galleries,
      fetchGalleries,
      createGallery,
      updateGallery,
      deleteGalleryData,
      showModal,
      isEdit,
      closeModal,
      selectedFile,
      resetForm: () => {
        form.value = { id: null, gambar: null, keterangan: '' }
        selectedFile.value = null
        imagePreview.value = null
      }
    })

    // Utility functions
    const getImageUrl = (path) => {
      if (!path) return '/default-gallery.jpg'
      const cleanPath = path.startsWith('/') ? path.substring(1) : path
      return `${import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'}/${cleanPath}`
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    const showNotification = (message, type = 'success') => {
      alert(message)
    }

    // Lifecycle hook
    onMounted(() => {
      fetchGalleries()
    })

    return {
      // State
      galleries,
      loading,
      showModal,
      isEdit,
      selectedFile,
      imagePreview,
      form,
      submitting,
      error,
      
      // Methods
      fetchGalleries,
      openCreateModal,
      openEditModal,
      closeModal,
      handleFileChange,
      removeImagePreview,
      handleImageError,
      submitForm,
      deleteGallery,
      getImageUrl,
      formatDate,
      showNotification
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/dashboard/dashboardgallery.css';
</style>