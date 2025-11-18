/**
    DASHBOARD GALLERY MANAGEMENT LOGIC
    Deskripsi: Business logic dan state management untuk komponen DashboardGallery
    Tanggal: [15/11/2024]
    Developer: [Danu Tri Anugrah]
 */

import { ref } from 'vue'
import galleryService from '@/services/galleryService'

// ==================== GALLERY MANAGEMENT ====================

/**
 * Composable untuk mengelola state dan operasi galeri
 */
export const useGallery = () => {
  const galleries = ref([])
  const loading = ref(true)

  /**
   * Fetch semua data galeri dari API
   */
  const fetchGalleries = async () => {
    try {
      loading.value = true
      const response = await galleryService.getAll()
      galleries.value = response.data
    } catch (err) {
      console.error('Error fetching galleries:', err)
      showNotification('Gagal memuat galeri foto', 'error')
    } finally {
      loading.value = false
    }
  }

  /**
   * Membuat galeri baru
   * @param {FormData} formData - Data form untuk galeri baru
   */
  const createGallery = async (formData) => {
    const response = await galleryService.create(formData)
    return response
  }

  /**
   * Update galeri yang sudah ada
   * @param {number} id - ID galeri
   * @param {FormData} formData - Data form untuk update
   */
  const updateGallery = async (id, formData) => {
    const response = await galleryService.update(id, formData)
    return response
  }

  /**
   * Hapus galeri
   * @param {number} id - ID galeri yang akan dihapus
   */
  const deleteGalleryData = async (id) => {
    const response = await galleryService.delete(id)
    return response
  }

  return {
    galleries,
    loading,
    fetchGalleries,
    createGallery,
    updateGallery,
    deleteGalleryData
  }
}

// ==================== MODAL MANAGEMENT ====================

/**
 * Composable untuk mengelola state modal
 */
export const useModal = () => {
  const showModal = ref(false)
  const isEdit = ref(false)

  /**
   * Buka modal untuk create
   */
  const openCreateModal = () => {
    isEdit.value = false
    showModal.value = true
  }

  /**
   * Buka modal untuk edit
   * @param {Object} gallery - Data galeri yang akan diedit
   */
  const openEditModal = (gallery) => {
    isEdit.value = true
    showModal.value = true
    return gallery
  }

  /**
   * Tutup modal dan reset state
   */
  const closeModal = () => {
    showModal.value = false
  }

  return {
    showModal,
    isEdit,
    openCreateModal,
    openEditModal,
    closeModal
  }
}

// ==================== FILE HANDLING ====================

/**
 * Composable untuk mengelola upload file dan preview
 */
export const useFileHandling = () => {
  const selectedFile = ref(null)
  const imagePreview = ref(null)

  /**
   * Handle perubahan file input
   * @param {Event} event - Event change dari file input
   */
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (!file) return

    // Validasi ukuran file (maksimal 2MB)
    if (file.size > 2048000) {
      showNotification('Ukuran file maksimal 2MB', 'error')
      event.target.value = ''
      return
    }

    // Validasi tipe file
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      showNotification('Format file harus JPG, PNG, atau WEBP', 'error')
      event.target.value = ''
      return
    }

    selectedFile.value = file
    
    // Buat preview
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }

  /**
   * Hapus preview gambar
   */
  const removeImagePreview = () => {
    imagePreview.value = null
    selectedFile.value = null
    const fileInput = document.getElementById('gallery-image')
    if (fileInput) fileInput.value = ''
  }

  /**
   * Handle error loading gambar
   * @param {Event} event - Event error dari tag img
   */
  const handleImageError = (event) => {
    event.target.src = '/default-gallery.jpg'
  }

  return {
    selectedFile,
    imagePreview,
    handleFileChange,
    removeImagePreview,
    handleImageError
  }
}

// ==================== FORM MANAGEMENT ====================

/**
 * Composable untuk mengelola form submission dan validasi
 */
export const useForm = (dependencies) => {
  const {
    fetchGalleries,
    createGallery,
    updateGallery,
    deleteGalleryData,
    isEdit,
    closeModal,
    selectedFile,
    resetForm
  } = dependencies

  const form = ref({
    id: null,
    gambar: null,
    keterangan: ''
  })
  const submitting = ref(false)
  const error = ref(null)

  /**
   * Handle form submission untuk create/update
   */
  const submitForm = async () => {
    try {
      submitting.value = true
      error.value = null

      const formData = new FormData()
      formData.append('keterangan', form.value.keterangan)
      
      if (selectedFile.value) {
        formData.append('gambar', selectedFile.value)
      }

      if (isEdit.value) {
        await updateGallery(form.value.id, formData)
        showNotification('Foto berhasil diupdate!', 'success')
      } else {
        await createGallery(formData)
        showNotification('Foto berhasil diupload!', 'success')
      }

      closeModal()
      resetForm()
      fetchGalleries()
    } catch (err) {
      error.value = err.response?.data?.message || 'Terjadi kesalahan saat menyimpan foto'
      console.error('Error submitting form:', err)
    } finally {
      submitting.value = false
    }
  }

  /**
   * Hapus galeri dengan konfirmasi
   * @param {number} id - ID galeri yang akan dihapus
   */
  const deleteGallery = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus foto ini? Tindakan ini tidak dapat dibatalkan.')) return
    
    try {
      await deleteGalleryData(id)
      showNotification('Foto berhasil dihapus!', 'success')
      fetchGalleries()
    } catch (err) {
      console.error('Error deleting gallery:', err)
      showNotification('Gagal menghapus foto', 'error')
    }
  }

  return {
    form,
    submitting,
    error,
    submitForm,
    deleteGallery,
    resetForm
  }
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Tampilkan notifikasi (bisa diintegrasikan dengan library notifikasi)
 * @param {string} message - Pesan notifikasi
 * @param {string} type - Tipe notifikasi (success, error, warning)
 */
const showNotification = (message, type = 'success') => {
  // TODO: Integrate with notification library like Toast, Snackbar, etc.
  alert(`[${type.toUpperCase()}] ${message}`)
}

export default {
  useGallery,
  useModal,
  useFileHandling,
  useForm
}