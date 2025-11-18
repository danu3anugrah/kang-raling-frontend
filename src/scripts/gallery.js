/**
    COMPOSABLE & UTILITY FUNCTIONS UNTUK GALLERY PAGE
    Deskripsi: State management dan utility functions untuk halaman galeri
    Tanggal: [15/11/2025]
    Developer: [Danu Tri Anugrah]
 */

import { ref, computed } from 'vue';

// ==================== LIGHTBOX COMPOSABLE ====================

/**
 * COMPOSABLE UNTUK LIGHTBOX FUNCTIONALITY
 * Mengelola state dan behavior modal lightbox
 */
export function useLightbox() {
  /**
   * STATE LIGHTBOX VISIBILITY
   * Mengontrol tampil/tidaknya lightbox modal
   */
  const showLightbox = ref(false);

  /**
   * STATE SELECTED IMAGE
   * Menyimpan data gambar yang sedang dipilih untuk lightbox
   */
  const selectedImage = ref(null);

  /**
   * OPEN LIGHTBOX MODAL
   * Menampilkan lightbox dengan gambar yang dipilih
   * @param {Object} gallery - Data galeri yang dipilih
   */
  const openLightbox = (gallery) => {
    selectedImage.value = gallery;
    showLightbox.value = true;
    // Prevent body scroll ketika lightbox terbuka
    document.body.style.overflow = "hidden";
  };

  /**
   * CLOSE LIGHTBOX MODAL
   * Menutup lightbox dan reset state
   */
  const closeLightbox = () => {
    showLightbox.value = false;
    selectedImage.value = null;
    // Restore body scroll
    document.body.style.overflow = "auto";
  };

  return {
    showLightbox,
    selectedImage,
    openLightbox,
    closeLightbox
  };
}

// ==================== SEARCH COMPOSABLE ====================

/**
 * COMPOSABLE UNTUK SEARCH FUNCTIONALITY
 * Mengelola filtering galleries berdasarkan search query
 */
export function useSearch(galleries, searchQuery) {
  /**
   * COMPUTED FILTERED GALLERIES
   * Memfilter list galleries berdasarkan search query
   * Pencarian mencakup: keterangan dan judul gambar
   */
  const filteredGalleries = computed(() => {
    const query = searchQuery.value.toLowerCase();
    
    // Return semua galleries jika tidak ada query
    if (!query) return galleries.value;
    
    // Filter berdasarkan keterangan atau judul
    return galleries.value.filter(
      (gallery) =>
        (gallery.keterangan && gallery.keterangan.toLowerCase().includes(query)) ||
        (gallery.judul && gallery.judul.toLowerCase().includes(query))
    );
  });

  return {
    filteredGalleries
  };
}

// ==================== IMAGE UTILITIES COMPOSABLE ====================

/**
 * COMPOSABLE UNTUK IMAGE UTILITY FUNCTIONS
 * Helper functions untuk handling gambar
 */
export function useImageUtils() {
  /**
   * GET IMAGE URL
   * Mengkonversi path relatif menjadi URL lengkap
   * @param {string} path - Path relatif gambar dari backend
   * @returns {string} URL lengkap gambar
   */
  const getImageUrl = (path) => {
    if (!path) return "/default-gallery.jpg";
    return `http://127.0.0.1:8000/${path}`;
  };

  /**
   * HANDLE IMAGE ERROR
   * Fallback ketika gambar gagal load
   * @param {Event} event - Error event dari tag img
   */
  const handleImageError = (event) => {
    event.target.src = "/default-gallery.jpg";
  };

  return {
    getImageUrl,
    handleImageError
  };
}

// ==================== MAIN GALLERY COMPOSABLE ====================

/**
 * MAIN GALLERY COMPOSABLE
 * Untuk state management yang lebih kompleks (jika diperlukan)
 */
export function useGallery() {
  const galleries = ref([]);
  const loading = ref(true);
  const error = ref(null);

  return {
    galleries,
    loading,
    error
  };
}

// Export semua functions sebagai default
export default {
  useLightbox,
  useSearch,
  useImageUtils,
  useGallery
};