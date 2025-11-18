/**
    DASHBOARD BLOG MANAGEMENT BUSINESS LOGIC
    Deskripsi: Composable functions untuk mengelola CRUD operations blog articles
    Tanggal: [15/11/2024]
    Developer: [Danu Tri Anugrah]
 */

import { ref } from 'vue'
import blogService from '@/services/blogService'

/**
 * Main composable function untuk blog management
 * @returns {Object} Reactive data dan functions untuk blog management
 */
export function useBlogManagement() {
  // REACTIVE STATE
  const blogs = ref([])
  const loading = ref(true)
  const showModal = ref(false)
  const isEdit = ref(false)
  const submitting = ref(false)
  const error = ref(null)
  const selectedFile = ref(null)
  const imagePreview = ref(null)

  // FORM STATE
  const form = ref({
    id: null,
    gambar: null,
    judul: '',
    nama_penulis: '',
    isi_berita: ''
  })

  // API FUNCTIONS
  /**
   * Fetch all blogs from API
   * @returns {Promise<void>}
   */
  const fetchBlogs = async () => {
    try {
      loading.value = true
      const response = await blogService.getAll()
      blogs.value = response.data
    } catch (err) {
      console.error('Error fetching blogs:', err)
      error.value = 'Gagal memuat artikel. Silakan refresh halaman.'
      showNotification('Gagal memuat artikel', 'error')
    } finally {
      loading.value = false
    }
  }

  /**
   * Create new blog article
   * @param {FormData} formData - Form data for blog creation
   * @returns {Promise<Object>} API response
   */
  const createBlog = async (formData) => {
    const response = await blogService.create(formData)
    return response
  }

  /**
   * Update existing blog article
   * @param {number} id - Blog ID
   * @param {FormData} formData - Form data for blog update
   * @returns {Promise<Object>} API response
   */
  const updateBlog = async (id, formData) => {
    const response = await blogService.update(id, formData)
    return response
  }

  /**
   * Delete blog article
   * @param {number} id - Blog ID to delete
   * @returns {Promise<Object>} API response
   */
  const deleteBlogData = async (id) => {
    const response = await blogService.delete(id)
    return response
  }

  // MODAL FUNCTIONS
  /**
   * Open modal for creating new blog
   */
  const openCreateModal = () => {
    isEdit.value = false
    resetForm()
    showModal.value = true
  }

  /**
   * Open modal for editing existing blog
   * @param {Object} blog - Blog object to edit
   */
  const openEditModal = (blog) => {
    isEdit.value = true
    form.value = {
      id: blog.id,
      gambar: blog.gambar,
      judul: blog.judul,
      nama_penulis: blog.nama_penulis,
      isi_berita: blog.isi_berita
    }
    selectedFile.value = null
    imagePreview.value = null
    showModal.value = true
  }

  /**
   * Close modal and reset form
   */
  const closeModal = () => {
    if (submitting.value) return // Prevent closing while submitting
    
    showModal.value = false
    resetForm()
    error.value = null
  }

  /**
   * Reset form to initial state
   */
  const resetForm = () => {
    form.value = {
      id: null,
      gambar: null,
      judul: '',
      nama_penulis: '',
      isi_berita: ''
    }
    selectedFile.value = null
    imagePreview.value = null
  }

  // FILE HANDLING FUNCTIONS
  /**
   * Handle file input change event
   * @param {Event} event - File input change event
   */
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (!file) return

    // Validate file size (2MB max)
    if (file.size > 2048000) {
      showNotification('Ukuran file maksimal 2MB', 'error')
      event.target.value = ''
      return
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      showNotification('Format file harus JPG, PNG, atau WEBP', 'error')
      event.target.value = ''
      return
    }

    selectedFile.value = file
    
    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }

  /**
   * Remove image preview and clear file input
   */
  const removeImagePreview = () => {
    imagePreview.value = null
    selectedFile.value = null
    const fileInput = document.getElementById('blog-image')
    if (fileInput) fileInput.value = ''
  }

  /**
   * Handle image loading error
   * @param {Event} event - Image error event
   */
  const handleImageError = (event) => {
    event.target.src = '/default-blog.jpg'
  }

  // FORM SUBMISSION
  /**
   * Handle form submission for create/update
   */
  const submitForm = async () => {
    try {
      submitting.value = true
      error.value = null

      const formData = new FormData()
      formData.append('judul', form.value.judul)
      formData.append('nama_penulis', form.value.nama_penulis)
      formData.append('isi_berita', form.value.isi_berita)
      
      if (selectedFile.value) {
        formData.append('gambar', selectedFile.value)
      }

      if (isEdit.value) {
        await updateBlog(form.value.id, formData)
        showNotification('Artikel berhasil diupdate!', 'success')
      } else {
        await createBlog(formData)
        showNotification('Artikel berhasil ditambahkan!', 'success')
      }

      closeModal()
      fetchBlogs()
    } catch (err) {
      error.value = err.response?.data?.message || 'Terjadi kesalahan saat menyimpan artikel'
      console.error('Error submitting form:', err)
    } finally {
      submitting.value = false
    }
  }

  // DELETE FUNCTION
  /**
   * Delete blog article with confirmation
   * @param {number} id - Blog ID to delete
   */
  const deleteBlog = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus artikel ini? Tindakan ini tidak dapat dibatalkan.')) return
    
    try {
      await deleteBlogData(id)
      showNotification('Artikel berhasil dihapus!', 'success')
      fetchBlogs()
    } catch (err) {
      console.error('Error deleting blog:', err)
      showNotification('Gagal menghapus artikel', 'error')
    }
  }

  // UTILITY FUNCTIONS
  /**
   * Get full image URL from path
   * @param {string} path - Image path from API
   * @returns {string} Full image URL
   */
  const getImageUrl = (path) => {
    if (!path) return '/default-blog.jpg'
    // Remove leading slash if present to avoid double slashes
    const cleanPath = path.startsWith('/') ? path.substring(1) : path
    return `${import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'}/${cleanPath}`
  }

  /**
   * Format date to Indonesian locale
   * @param {string} dateString - Date string to format
   * @returns {string} Formatted date
   */
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // RETURN COMPOSABLE API
  return {
    // Reactive state
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
  }
}

/**
 * Show notification message
 * @param {string} message - Notification message
 * @param {string} _type - Notification type (success, error, warning)
 */
export const showNotification = (message, _type = 'success') => {
  // You can integrate with a notification library here
  alert(message) // Simple alert for now
}

/**
 * Validate image file
 * @param {File} file - File object to validate
 * @returns {Object} Validation result { isValid: boolean, message: string }
 */
export const validateImageFile = (file) => {
  const maxSize = 2 * 1024 * 1024 // 2MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  
  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, message: 'Format file harus JPG, PNG, atau WEBP' }
  }
  
  if (file.size > maxSize) {
    return { isValid: false, message: 'Ukuran file maksimal 2MB' }
  }
  
  return { isValid: true, message: '' }
}