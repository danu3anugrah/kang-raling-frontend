<!-- 
  KOMPONEN HALAMAN BLOG & ARTIKEL
  Deskripsi: Halaman untuk menampilkan daftar artikel blog Kang Raling
  Tanggal: [15/11/2025]
  Developer: [Danu Tri Anugrah]
-->

<template>
  <div class="blog-page">
    <Navbar />

    <!-- ==================== SECTION 1: HERO BLOG ==================== -->
    <!-- Section header dengan background image dan search bar -->
    <section class="hero-blog">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <!-- Badge identifikasi section -->
        <div class="hero-badge">
          <i class="bi bi-newspaper"></i>
          <span>Blog Kang Raling</span>
        </div>
        
        <!-- Title dan subtitle -->
        <h1 class="hero-title">
          Blog & <span class="gradient-text">Artikel</span>
        </h1>
        <p class="hero-subtitle">
          Informasi terkini seputar pengelolaan sampah dan lingkungan hidup
        </p>

        <!-- Search Bar untuk filter artikel -->
        <div class="search-bar">
          <i class="bi bi-search"></i>
          <input
            type="text"
            placeholder="Cari artikel, penulis, atau topik..."
            v-model="searchQuery"
          />
        </div>
      </div>

      <!-- Wave divider untuk transisi -->
      <div class="wave-divider">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="#f8f9fa" fill-opacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>

    <!-- ==================== SECTION 2: BLOG CONTENT ==================== -->
    <!-- Section utama menampilkan konten artikel -->
    <section class="blog-content">
      <div class="container">
        
        <!-- ========== LOADING STATE ========== -->
        <!-- Ditampilkan saat data sedang fetching -->
        <div v-if="loading" class="loading-state">
          <div class="spinner-wrapper">
            <div class="spinner"></div>
            <p>Memuat artikel terbaru...</p>
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
          <button class="btn-retry" @click="fetchBlogs">
            <i class="bi bi-arrow-clockwise"></i>
            Coba Lagi
          </button>
        </div>

        <!-- ========== EMPTY STATE ========== -->
        <!-- Ditampilkan ketika tidak ada artikel -->
        <div v-else-if="filteredBlogs.length === 0" class="empty-state">
          <div class="empty-icon">
            <i class="bi bi-inbox"></i>
          </div>
          <h3>Tidak Ada Artikel</h3>
          <p v-if="searchQuery">
            Tidak ditemukan artikel dengan pencarian "<strong>{{ searchQuery }}</strong>"
          </p>
          <p v-else>Artikel menarik akan segera hadir!</p>
          <button v-if="searchQuery" class="btn-clear" @click="searchQuery = ''">
            <i class="bi bi-x-circle"></i>
            Hapus Pencarian
          </button>
        </div>

        <!-- ========== BLOG CONTENT ========== -->
        <!-- Ditampilkan ketika data berhasil diload -->
        <div v-else>
          
          <!-- FEATURED ARTICLE -->
          <!-- Artikel pertama ditampilkan sebagai featured -->
          <div
            v-if="filteredBlogs.length > 0"
            class="featured-article"
            @click="goToDetail(filteredBlogs[0].id)"
          >
            <div class="featured-left">
              <!-- Badge featured article -->
              <div class="featured-badge">
                <i class="bi bi-star-fill"></i>
                Artikel Pilihan
              </div>
              
              <!-- Judul dan konten artikel -->
              <h2 class="featured-title">{{ filteredBlogs[0].judul }}</h2>
              <p class="featured-excerpt">
                {{ getExcerpt(filteredBlogs[0].isi_berita, 200) }}
              </p>
              
              <!-- Meta informasi artikel -->
              <div class="featured-meta">
                <span class="meta-item">
                  <i class="bi bi-person-circle"></i>
                  {{ filteredBlogs[0].nama_penulis }}
                </span>
                <span class="meta-item">
                  <i class="bi bi-calendar3"></i>
                  {{ formatDate(filteredBlogs[0].created_at) }}
                </span>
                <span class="meta-item">
                  <i class="bi bi-clock"></i>
                  {{ getReadTime(filteredBlogs[0].isi_berita) }} menit
                </span>
              </div>
              
              <!-- CTA button -->
              <button class="btn-read">
                Baca Selengkapnya
                <i class="bi bi-arrow-right"></i>
              </button>
            </div>
            
            <!-- Gambar featured article -->
            <div class="featured-right">
              <img
                :src="getImageUrl(filteredBlogs[0].gambar)"
                :alt="filteredBlogs[0].judul"
                @error="handleImageError"
              />
            </div>
          </div>

          <!-- REGULAR ARTICLES -->
          <!-- Grid artikel selain featured -->
          <div class="articles-section" v-if="filteredBlogs.length > 1">
            <h2 class="section-subtitle">Artikel Lainnya</h2>
            <div class="articles-grid">
              <!-- Loop melalui artikel mulai dari index 1 -->
              <div
                v-for="blog in filteredBlogs.slice(1)"
                :key="blog.id"
                class="article-card"
                @click="goToDetail(blog.id)"
              >
                <!-- Gambar artikel -->
                <div class="article-image">
                  <img
                    :src="getImageUrl(blog.gambar)"
                    :alt="blog.judul"
                    @error="handleImageError"
                  />
                  <div class="image-overlay">
                    <i class="bi bi-arrow-right-circle"></i>
                  </div>
                </div>
                
                <!-- Body artikel -->
                <div class="article-body">
                  <!-- Meta info (read time & date) -->
                  <div class="article-meta">
                    <span class="meta-badge">
                      <i class="bi bi-clock"></i>
                      {{ getReadTime(blog.isi_berita) }} min
                    </span>
                    <span class="meta-date">
                      {{ formatDateShort(blog.created_at) }}
                    </span>
                  </div>
                  
                  <!-- Judul dan excerpt -->
                  <h3 class="article-title">{{ blog.judul }}</h3>
                  <p class="article-excerpt">
                    {{ getExcerpt(blog.isi_berita, 120) }}
                  </p>
                  
                  <!-- Footer dengan author dan CTA -->
                  <div class="article-footer">
                    <div class="author-info">
                      <i class="bi bi-person-circle"></i>
                      <span>{{ blog.nama_penulis }}</span>
                    </div>
                    <span class="read-link">
                      Baca
                      <i class="bi bi-arrow-right"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import { 
  useBlogPage,
  getImageUrl,
  handleImageError,
  getExcerpt,
  getReadTime,
  formatDate,
  formatDateShort
} from '@/scripts/blog.js'
import '@/assets/css/blog.css'

export default {
  name: 'BlogPage',
  components: {
    Navbar,
    Footer
  },
  setup() {
    const router = useRouter()
    
    // Gunakan composable blog untuk state management
    const {
      blogs,
      loading,
      error,
      searchQuery,
      fetchBlogs,
      filteredBlogs
    } = useBlogPage()

    /**
     * FUNGSI UNTUK NAVIGASI KE HALAMAN DETAIL BLOG
     * @param {number} id - ID artikel yang dipilih
     */
    const goToDetail = (id) => {
      router.push(`/blog/${id}`)
    }

    // Fetch data saat komponen mounted
    onMounted(() => {
      fetchBlogs()
    })

    return {
      blogs,
      loading,
      error,
      searchQuery,
      filteredBlogs,
      goToDetail,
      getImageUrl,
      handleImageError,
      getExcerpt,
      getReadTime,
      formatDate,
      formatDateShort
    }
  }
}
</script>

<style scoped src="@/assets/css/blog.css"></style>