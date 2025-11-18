/**
    DASHBOARD PAGE BUSINESS LOGIC
    Deskripsi: Composable functions untuk mengelola data dan logic halaman dashboard
    Tanggal: [15/11/2024]
    Developer: [Danu Tri Anugrah]
 */

import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import blogService from '@/services/blogService'
import galleryService from '@/services/galleryService'
import ecomapService from '@/services/ecomapService'

/**
 * Main composable function untuk dashboard data management
 * @returns {Object} Reactive data dan functions untuk dashboard
 */
export function useDashboardData() {
  // STATE MANAGEMENT
  const authStore = useAuthStore()
  
  // Reactive data
  const userName = ref(authStore.user?.name || 'Fasilitator')
  const totalBlogs = ref(0)
  const totalGalleries = ref(0)
  const totalEcomaps = ref(0)

  // COMPUTED PROPERTIES
  /**
   * Format current date to Indonesian locale
   * @returns {string} Formatted date string
   */
  const currentDate = computed(() => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    return new Date().toLocaleDateString('id-ID', options)
  })

  // API FUNCTIONS
  /**
   * Fetch statistics data from all services
   * @returns {Promise<void>}
   */
  const fetchStats = async () => {
    try {
      // Use Promise.all untuk parallel requests
      const [blogsRes, galleriesRes, ecomapsRes] = await Promise.all([
        blogService.getAll(),
        galleryService.getAll(),
        ecomapService.getAllEcomaps()
      ])
      
      // Update reactive data
      totalBlogs.value = blogsRes.data.length
      totalGalleries.value = galleriesRes.data.length
      totalEcomaps.value = ecomapsRes.data.length
      
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
      handleStatsError(error)
    }
  }

  // ERROR HANDLING
  /**
   * Handle errors from statistics fetching
   * @param {Error} error - Error object
   */
  const handleStatsError = (error) => {
    // Log error untuk debugging
    console.error('Dashboard stats error:', error)
    
    // Set default values jika error
    totalBlogs.value = 0
    totalGalleries.value = 0
    totalEcomaps.value = 0
    
    // Bisa ditambahkan notification system di sini
    // showNotification('Gagal memuat statistik dashboard', 'error')
  }

  // RETURN COMPOSABLE API
  return {
    // Reactive data
    userName,
    currentDate,
    totalBlogs,
    totalGalleries,
    totalEcomaps,
    
    // Functions
    fetchStats
  }
}

/**
 * Utility function untuk format numbers
 * @param {number} num - Number to format
 * @returns {string} Formatted number string
 */
export const formatNumber = (num) => {
  return new Intl.NumberFormat('id-ID').format(num)
}

/**
 * Utility function untuk calculate progress percentage
 * @param {number} current - Current value
 * @param {number} target - Target value
 * @returns {number} Percentage value
 */
export const calculateProgress = (current, target) => {
  if (target === 0) return 0
  return Math.round((current / target) * 100)
}