/**
    COMPOSABLE & UTILITY FUNCTIONS UNTUK BLOG DETAIL PAGE
    Deskripsi: State management dan utility functions untuk halaman blog detail
    Tanggal: [15/11/2025]
    Developer: [Danu Tri Anugrah]
 */

import { ref } from 'vue'
import blogService from "../services/blogService"

// ==================== BLOG DETAIL COMPOSABLE ====================

/**
 * COMPOSABLE UNTUK STATE MANAGEMENT BLOG DETAIL
 * Mengelola state blog detail, loading, dan error
 */
export const useBlogDetail = () => {
  const blog = ref(null)
  const loading = ref(true)
  const error = ref(null)
  const linkCopied = ref(false)

  /**
   * FETCH BLOG DETAIL DARI API
   * @param {string|number} id - ID artikel yang akan diambil
   */
  const fetchBlogDetail = async (id) => {
    try {
      loading.value = true
      error.value = null
      const response = await blogService.getById(id)
      blog.value = response.data
    } catch (err) {
      error.value = "Artikel tidak ditemukan atau telah dihapus."
      console.error("Error fetching blog detail:", err)
    } finally {
      loading.value = false
    }
  }

  return {
    blog,
    loading,
    error,
    linkCopied,
    fetchBlogDetail
  }
}

// ==================== CONTENT FORMATTING FUNCTIONS ====================

/**
 * FORMAT KONTEN ARTIKEL DENGAN HTML
 * Memproses konten plain text menjadi HTML dengan formatting yang proper
 * @param {string} content - Konten artikel dalam plain text
 * @returns {string} Konten yang sudah diformat dengan HTML
 */
export const formatContent = (content) => {
  if (!content) return "<p></p>"

  let paragraphs = content.split("\n\n")

  // Fallback: split berdasarkan kalimat jika tidak ada paragraf terdeteksi
  if (paragraphs.length === 1 && content.includes(". ")) {
    paragraphs = content
      .split(". ")
      .map((p) => p.trim() + ".")
      .filter((p) => p.length > 1)
  }

  // Handle single paragraph
  if (paragraphs.length === 1) {
    return `<p>${content.replace(/\n/g, "<br>")}</p>`
  }

  // Format multiple paragraphs dengan styling khusus
  const formatted = paragraphs
    .map((p, index) => {
      if (p.trim()) {
        const className = index === 0 ? "first-paragraph" : ""
        return `<p class="${className}">${p.trim().replace(/\n/g, "<br>")}</p>`
      }
      return ""
    })
    .join("")

  return formatted || `<p>${content}</p>`
}

// ==================== SOCIAL SHARE FUNCTIONS ====================

/**
 * SHARE KE WHATSAPP
 * @param {Object} blogData - Data artikel
 * @param {string} currentUrl - URL current page
 */
export const shareToWhatsApp = (blogData, currentUrl) => {
  const text = `Baca artikel: ${blogData.judul}`
  window.open(
    `https://wa.me/?text=${encodeURIComponent(text + " " + currentUrl)}`,
    "_blank"
  )
}

/**
 * SHARE KE FACEBOOK
 * @param {string} currentUrl - URL current page
 */
export const shareToFacebook = (currentUrl) => {
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    "_blank"
  )
}

/**
 * SHARE KE TWITTER
 * @param {Object} blogData - Data artikel
 * @param {string} currentUrl - URL current page
 */
export const shareToTwitter = (blogData, currentUrl) => {
  const text = blogData.judul
  window.open(
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(currentUrl)}`,
    "_blank"
  )
}

/**
 * COPY LINK KE CLIPBOARD
 * @param {string} url - URL yang akan disalin
 * @param {Function} setLinkCopied - Function untuk set status copied
 */
export const copyLink = async (url, setLinkCopied) => {
  try {
    // Modern Clipboard API
    await navigator.clipboard.writeText(url)
    setLinkCopied(true)
    
    // Reset status setelah 2 detik
    setTimeout(() => {
      setLinkCopied(false)
    }, 2000)
  // oxlint-disable-next-line no-unused-vars
  } catch (err) {
    // Fallback untuk browser lama
    const textArea = document.createElement("textarea")
    textArea.value = url
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand("copy")
    document.body.removeChild(textArea)
    
    setLinkCopied(true)
    setTimeout(() => {
      setLinkCopied(false)
    }, 2000)
  }
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * MENDAPATKAN URL GAMBAR LENGKAP
 * @param {string} path - Path relatif gambar
 * @param {string} baseUrl - Base URL untuk gambar
 * @returns {string} URL lengkap gambar
 */
export const getImageUrl = (path, baseUrl = "http://127.0.0.1:8000/") => {
  if (!path) return "/default-blog.jpg"
  return `${baseUrl}${path}`
}

/**
 * HANDLE IMAGE ERROR FALLBACK
 * @param {Event} event - Error event
 * @param {string} fallbackUrl - Fallback image URL
 */
export const handleImageError = (event, fallbackUrl = "/default-blog.jpg") => {
  event.target.src = fallbackUrl
}

/**
 * FORMAT TANGGAL LENGKAP (Indonesian)
 * @param {string} date - Date string
 * @returns {string} Formatted date
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

/**
 * MENGHITUNG WAKTU BACA
 * @param {string} text - Article content
 * @param {number} wordsPerMinute - Kecepatan baca (default 200 WPM)
 * @returns {number} Estimated read time in minutes
 */
export const getReadTime = (text, wordsPerMinute = 200) => {
  if (!text) return 1
  const words = text.split(" ").length
  return Math.ceil(words / wordsPerMinute)
}

// Export semua functions sebagai default
export default {
  useBlogDetail,
  formatContent,
  shareToWhatsApp,
  shareToFacebook,
  shareToTwitter,
  copyLink,
  getImageUrl,
  handleImageError,
  formatDate,
  getReadTime
}