/**
    UTILITY FUNCTIONS UNTUK HOMEPAGE
    Deskripsi: Kumpulan fungsi utilitas untuk komponen HomePage
    Tanggal: [15/11/2025]
    Developer: [Danu Tri Anugrah]
 */

import { onMounted } from 'vue'

/**
 * FUNGSI SCROLL SMOOTH KE SECTION
 * Digunakan untuk navigasi smooth scroll antar section
 * @param {string} id - ID element HTML yang dituju
 */
export const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
  }
}

/**
 * HOOK UNTUK KOMPONEN HOMEPAGE
 * Mengatur inisialisasi yang diperlukan saat komponen mounted
 */
export const useHomePage = () => {
  onMounted(() => {
    initAnimations()
    
    // Additional home page specific initialization
    console.log('HomePage mounted')
  })

  return {
    scrollToSection
  }
}

// Ekspor semua fungsi
export default {
  scrollToSection,
  initAnimations,
  useHomePage
}