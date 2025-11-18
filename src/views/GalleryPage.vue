<!-- 
  KOMPONEN HALAMAN GALERI FOTO
  Deskripsi: Halaman untuk menampilkan galeri foto dokumentasi Kang Raling
  Tanggal: [15/11/2025]
  Developer: [Danu Tri Anugrah]
-->

<template>
  <div class="gallery-page">
    <Navbar />

    <!-- ==================== SECTION 1: HERO GALLERY ==================== -->
    <!-- Section header dengan background image dan search functionality -->
    <section class="hero-gallery">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <!-- Badge identifikasi section -->
        <div class="hero-badge">
          <i class="bi bi-images"></i>
          <span>Galeri Kang Raling</span>
        </div>
        
        <!-- Title dan subtitle -->
        <h1 class="hero-title">
          Galeri <span class="gradient-text">Dokumentasi</span>
        </h1>
        <p class="hero-subtitle">
          Koleksi foto kegiatan dan momen penting di Kampung Ramah Lingkungan
        </p>

        <!-- Search Bar untuk filter foto -->
        <div class="search-bar">
          <i class="bi bi-search"></i>
          <input
            type="text"
            placeholder="Cari foto atau kegiatan..."
            v-model="searchQuery"
          />
        </div>
      </div>

      <!-- Wave divider untuk transisi visual -->
      <div class="wave-divider">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="#f8f9fa" fill-opacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>

    <!-- ==================== SECTION 2: GALLERY CONTENT ==================== -->
    <!-- Section utama menampilkan grid galeri foto -->
    <section class="gallery-content">
      <div class="container">
        
        <!-- ========== LOADING STATE ========== -->
        <!-- Ditampilkan saat data galeri sedang loading -->
        <div v-if="loading" class="loading-state">
          <div class="spinner-wrapper">
            <div class="spinner"></div>
            <p>Memuat galeri foto...</p>
          </div>
        </div>

        <!-- ========== ERROR STATE ========== -->
        <!-- Ditampilkan saat terjadi error fetching data -->
        <div v-else-if="error" class="error-state">
          <div class="error-icon">
            <i class="bi bi-exclamation-triangle"></i>
          </div>
          <h3>Oops! Terjadi Kesalahan</h3>
          <p>{{ error }}</p>
          <button class="btn-retry" @click="fetchGalleries">
            <i class="bi bi-arrow-clockwise"></i>
            Coba Lagi
          </button>
        </div>

        <!-- ========== EMPTY STATE ========== -->
        <!-- Ditampilkan ketika tidak ada foto yang ditemukan -->
        <div v-else-if="filteredGalleries.length === 0" class="empty-state">
          <div class="empty-icon">
            <i class="bi bi-images"></i>
          </div>
          <h3>Tidak Ada Foto</h3>
          <p v-if="searchQuery">
            Tidak ditemukan foto dengan pencarian "<strong>{{ searchQuery }}</strong>"
          </p>
          <p v-else>Galeri foto akan segera hadir!</p>
          <button v-if="searchQuery" class="btn-clear" @click="searchQuery = ''">
            <i class="bi bi-x-circle"></i>
            Hapus Pencarian
          </button>
        </div>

        <!-- ========== GALLERY GRID ========== -->
        <!-- Grid layout untuk menampilkan foto-foto -->
        <div v-else class="gallery-grid">
          <!-- Loop melalui setiap item galeri -->
          <div
            v-for="gallery in filteredGalleries"
            :key="gallery.id"
            class="gallery-item"
            @click="openLightbox(gallery)"
          >
            <!-- Container gambar dengan overlay effect -->
            <div class="gallery-image">
              <img
                :src="getImageUrl(gallery.gambar)"
                :alt="gallery.keterangan || 'Dokumentasi Kang Raling'"
                @error="handleImageError"
              />
              <!-- Overlay dengan zoom icon -->
              <div class="image-overlay">
                <i class="bi bi-zoom-in"></i>
              </div>
            </div>
            
            <!-- Keterangan/caption foto -->
            <div class="gallery-caption">
              <p>{{ gallery.keterangan || 'Dokumentasi Kegiatan' }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== LIGHTBOX MODAL ==================== -->
    <!-- Modal untuk menampilkan foto dalam ukuran besar -->
    <div v-if="showLightbox" class="lightbox-overlay" @click="closeLightbox">
      <!-- Tombol close lightbox -->
      <button class="lightbox-close" @click="closeLightbox">
        <i class="bi bi-x-lg"></i>
      </button>
      
      <!-- Konten lightbox (gambar + caption) -->
      <div class="lightbox-content" @click.stop>
        <img
          :src="getImageUrl(selectedImage.gambar)"
          :alt="selectedImage.keterangan"
        />
        <div class="lightbox-caption" v-if="selectedImage.keterangan">
          {{ selectedImage.keterangan }}
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import { ref, computed, onMounted } from "vue";
import galleryService from "../services/galleryService";
import { 
  useGallery, 
  useLightbox, 
  useSearch, 
  useImageUtils 
} from '@/scripts/gallery.js';
import '@/assets/css/gallery.css';

// ==================== REACTIVE STATE ====================

/**
 * DATA GALLERIES
 * Menyimpan list galeri foto dari API
 */
const galleries = ref([]);

/**
 * LOADING STATE
 * Indikator sedang memuat data
 */
const loading = ref(true);

/**
 * ERROR STATE
 * Menyimpan pesan error jika fetch data gagal
 */
const error = ref(null);

/**
 * SEARCH QUERY
 * Input pencarian untuk filter foto
 */
const searchQuery = ref("");

// ==================== COMPOSABLE FUNCTIONS ====================

/**
 * LIGHTBOX FUNCTIONALITY
 * Mengelola state dan behavior lightbox modal
 */
const { showLightbox, selectedImage, openLightbox, closeLightbox } = useLightbox();

/**
 * SEARCH FUNCTIONALITY
 * Memfilter galleries berdasarkan search query
 */
const { filteredGalleries } = useSearch(galleries, searchQuery);

/**
 * IMAGE UTILITY FUNCTIONS
 * Helper functions untuk handling gambar
 */
const { getImageUrl, handleImageError } = useImageUtils();

// ==================== DATA FETCHING ====================

/**
 * FETCH GALLERIES DATA
 * Mengambil data galeri foto dari API service
 */
const fetchGalleries = async () => {
  try {
    loading.value = true;
    error.value = null;
    const response = await galleryService.getAll();
    galleries.value = response.data;
  } catch (err) {
    error.value = "Gagal memuat galeri. Silakan coba lagi.";
    console.error("Error fetching galleries:", err);
  } finally {
    loading.value = false;
  }
};

// ==================== EVENT HANDLERS ====================

/**
 * HANDLE KEYBOARD EVENTS
 * Menutup lightbox ketika tombol Escape ditekan
 * @param {KeyboardEvent} event - Event keyboard
 */
const handleKeydown = (event) => {
  if (event.key === "Escape" && showLightbox.value) {
    closeLightbox();
  }
};

// ==================== LIFECYCLE HOOKS ====================

/**
 * MOUNTED HOOK
 * Inisialisasi data dan event listeners saat komponen dimount
 */
onMounted(() => {
  fetchGalleries();
  document.addEventListener("keydown", handleKeydown);
});
</script>

<style scoped src="@/assets/css/gallery.css"></style>