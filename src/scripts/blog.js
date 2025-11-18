/**
    COMPOSABLE & UTILITY FUNCTIONS UNTUK BLOG PAGE
    File: blog.js
    Deskripsi: State management dan utility functions untuk halaman blog
    Tanggal: [15/11/2025]
    Developer: [Danu Tri Anugrah]
 */

import { ref, computed } from 'vue'
import blogService from "../services/blogService"

// ==================== BLOG COMPOSABLE ====================

/**
 * COMPOSABLE UNTUK STATE MANAGEMENT BLOG PAGE
 * Mengelola state blogs, loading, error, dan search functionality
 */
export const useBlogPage = () => {
  const blogs = ref([])
  const loading = ref(true)
  const error = ref(null)
  const searchQuery = ref('')

  /**
   * FETCH BLOGS DARI API
   * Mengambil data artikel dari backend service
   */
  const fetchBlogs = async () => {
    try {
      loading.value = true
      error.value = null
      const response = await blogService.getAll()
      blogs.value = response.data
    } catch (err) {
      error.value = "Gagal memuat artikel. Silakan coba lagi."
      console.error("Error fetching blogs:", err)
    } finally {
      loading.value = false
    }
  }

  /**
   * COMPUTED PROPERTY UNTUK FILTERED BLOGS
   * Memfilter artikel berdasarkan search query
   * Pencarian mencakup: judul, isi_berita, dan nama_penulis
   */
  const filteredBlogs = computed(() => {
    let filtered = blogs.value

    // Filter by search query
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(
        (blog) =>
          blog.judul.toLowerCase().includes(query) ||
          blog.isi_berita.toLowerCase().includes(query) ||
          blog.nama_penulis.toLowerCase().includes(query)
      )
    }

    return filtered
  })

  return {
    blogs,
    loading,
    error,
    searchQuery,
    fetchBlogs,
    filteredBlogs
  }
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * MENDAPATKAN URL GAMBAR LENGKAP
 * @param {string} path - Path relatif gambar dari backend
 * @returns {string} URL lengkap gambar
 */
export const getImageUrl = (path) => {
  if (!path) return "/default-blog.jpg"
  return `http://127.0.0.1:8000/${path}`
}

/**
 * HANDLE IMAGE ERROR FALLBACK
 * @param {Event} event - Event error pada tag img
 */
export const handleImageError = (event) => {
  event.target.src = "/default-blog.jpg"
}

/**
 * MEMBUAT EXCERPT/TEKS SINGKAT DARI KONTEN
 * @param {string} text - Teks lengkap
 * @param {number} maxLength - Panjang maksimal excerpt
 * @returns {string} Teks yang dipotong dengan ellipsis
 */
export const getExcerpt = (text, maxLength = 150) => {
  if (!text) return ""
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
}

/**
 * MENGHITUNG WAKTU BACA ARTIKEL
 * @param {string} text - Konten artikel
 * @returns {number} Perkiraan waktu baca dalam menit
 */
export const getReadTime = (text) => {
  if (!text) return 1
  const wordsPerMinute = 200
  const words = text.split(" ").length
  return Math.ceil(words / wordsPerMinute)
}

/**
 * FORMAT TANGGAL LENGKAP (Indonesian format)
 * @param {string} date - String tanggal dari API
 * @returns {string} Tanggal yang diformat
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

/**
 * FORMAT TANGGAL PENDEK (Indonesian format)
 * @param {string} date - String tanggal dari API
 * @returns {string} Tanggal pendek yang diformat
 */
export const formatDateShort = (date) => {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

// Export semua functions sebagai default
export default {
  useBlogPage,
  getImageUrl,
  handleImageError,
  getExcerpt,
  getReadTime,
  formatDate,
  formatDateShort
}