<!-- 
  KOMPONEN HALAMAN DETAIL BLOG
  Deskripsi: Halaman untuk menampilkan detail artikel blog lengkap
  Tanggal: [15/11/2025]
  Developer: [Danu Tri Anugrah]
-->

<template>
  <div class="blog-detail-page">
    <Navbar />

    <!-- ========== LOADING STATE ========== -->
    <!-- Ditampilkan saat data artikel sedang loading -->
    <div v-if="loading" class="loading-container">
      <div class="spinner-wrapper">
        <div class="spinner"></div>
        <p>Memuat artikel...</p>
      </div>
    </div>

    <!-- ========== ERROR STATE ========== -->
    <!-- Ditampilkan saat terjadi error atau artikel tidak ditemukan -->
    <div v-else-if="error" class="error-container">
      <div class="error-content">
        <div class="error-icon">
          <i class="bi bi-exclamation-triangle"></i>
        </div>
        <h3>Artikel Tidak Ditemukan</h3>
        <p>{{ error }}</p>
        <router-link to="/blog" class="btn-back-error">
          <i class="bi bi-arrow-left"></i>
          Kembali ke Blog
        </router-link>
      </div>
    </div>

    <!-- ========== BLOG CONTENT ========== -->
    <!-- Ditampilkan ketika data artikel berhasil diload -->
    <div v-else-if="blog" class="blog-detail-content">
      <div class="container">

        <!-- Article Container -->
        <article class="blog-article">
          
          <!-- ========== ARTICLE HEADER ========== -->
          <!-- Header artikel dengan judul dan meta informasi -->
          <header class="article-header">
            <h1 class="article-title">{{ blog.judul }}</h1>
            
            <!-- Meta informasi: author, tanggal, waktu baca -->
            <div class="article-meta">
              <div class="meta-item">
                <i class="bi bi-person-circle"></i>
                <span>{{ blog.nama_penulis }}</span>
              </div>
              <div class="meta-divider"></div>
              <div class="meta-item">
                <i class="bi bi-calendar3"></i>
                <span>{{ formatDate(blog.created_at) }}</span>
              </div>
              <div class="meta-divider"></div>
              <div class="meta-item">
                <i class="bi bi-clock"></i>
                <span>{{ getReadTime(blog.isi_berita) }} menit baca</span>
              </div>
            </div>
          </header>

          <!-- ========== FEATURED IMAGE ========== -->
          <!-- Gambar utama artikel -->
          <div class="article-image">
            <img
              :src="getImageUrl(blog.gambar)"
              :alt="blog.judul"
              @error="handleImageError"
            />
          </div>

          <!-- ========== ARTICLE BODY ========== -->
          <!-- Konten utama artikel dengan formatting -->
          <div class="article-body">
            <div class="body-content" v-html="formatContent(blog.isi_berita)"></div>
          </div>

          <!-- ========== SOCIAL SHARE SECTION ========== -->
          <!-- Section untuk berbagi artikel ke media sosial -->
          <div class="social-share-section">
            <h3 class="share-title">
              <i class="bi bi-share-fill"></i>
              Bagikan Artikel Ini
            </h3>
            <div class="share-buttons">
              <!-- WhatsApp Share -->
              <button class="share-btn whatsapp" @click="shareToWhatsApp(blog)">
                <i class="bi bi-whatsapp"></i>
                <span>WhatsApp</span>
              </button>
              
              <!-- Facebook Share -->
              <button class="share-btn facebook" @click="shareToFacebook()">
                <i class="bi bi-facebook"></i>
                <span>Facebook</span>
              </button>
              
              <!-- Twitter Share -->
              <button class="share-btn twitter" @click="shareToTwitter(blog)">
                <i class="bi bi-twitter"></i>
                <span>Twitter</span>
              </button>
              
              <!-- Copy Link -->
              <button class="share-btn copy" @click="copyLink(linkCopied)">
                <i class="bi bi-link-45deg"></i>
                <span>{{ linkCopied ? 'Tersalin!' : 'Salin Link' }}</span>
              </button>
            </div>
          </div>

          <!-- ========== AUTHOR CARD ========== -->
          <!-- Informasi penulis artikel -->
          <div class="author-card">
            <div class="author-avatar">
              <i class="bi bi-person-circle"></i>
            </div>
            <div class="author-info">
              <h4>{{ blog.nama_penulis }}</h4>
              <p>Kontributor Kang Raling</p>
            </div>
          </div>
        </article>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import blogService from "@/services/blogService";

const route = useRoute();
const blog = ref(null);
const loading = ref(true);
const error = ref(null);
const linkCopied = ref(false);

/**
 * FETCH BLOG DETAIL DARI API
 * Mengambil data artikel berdasarkan ID dari URL parameter
 */
const fetchBlogDetail = async () => {
  try {
    loading.value = true;
    error.value = null;
    const response = await blogService.getById(route.params.id);
    blog.value = response.data;
  } catch (err) {
    error.value = "Artikel tidak ditemukan atau telah dihapus.";
    console.error("Error fetching blog detail:", err);
  } finally {
    loading.value = false;
  }
};

// ==================== UTILITY FUNCTIONS ====================

/**
 * MENDAPATKAN URL GAMBAR LENGKAP
 * @param {string} path - Path relatif gambar dari backend
 * @returns {string} URL lengkap gambar
 */
const getImageUrl = (path) => {
  if (!path) return "/default-blog.jpg";
  return `http://127.0.0.1:8000/${path}`;
};

/**
 * HANDLE IMAGE ERROR FALLBACK
 * @param {Event} event - Event error pada tag img
 */
const handleImageError = (event) => {
  event.target.src = "/default-blog.jpg";
};

/**
 * FORMAT TANGGAL LENGKAP (Indonesian format)
 * @param {string} date - String tanggal dari API
 * @returns {string} Tanggal yang diformat
 */
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * MENGHITUNG WAKTU BACA ARTIKEL
 * @param {string} text - Konten artikel
 * @returns {number} Perkiraan waktu baca dalam menit
 */
const getReadTime = (text) => {
  if (!text) return 1;
  const wordsPerMinute = 200;
  const words = text.split(" ").length;
  return Math.ceil(words / wordsPerMinute);
};

/**
 * FORMAT KONTEN ARTIKEL DENGAN HTML
 * Memproses konten plain text menjadi HTML dengan formatting
 * @param {string} content - Konten artikel dalam plain text
 * @returns {string} Konten yang sudah diformat dengan HTML
 */
const formatContent = (content) => {
  if (!content) return "<p></p>";

  let paragraphs = content.split("\n\n");

  // Jika tidak ada paragraf terdeteksi, coba split berdasarkan kalimat
  if (paragraphs.length === 1 && content.includes(". ")) {
    paragraphs = content
      .split(". ")
      .map((p) => p.trim() + ".")
      .filter((p) => p.length > 1);
  }

  // Format single paragraph
  if (paragraphs.length === 1) {
    return `<p>${content.replace(/\n/g, "<br>")}</p>`;
  }

  // Format multiple paragraphs dengan class khusus untuk paragraf pertama
  const formatted = paragraphs
    .map((p, index) => {
      if (p.trim()) {
        const className = index === 0 ? "first-paragraph" : "";
        return `<p class="${className}">${p.trim().replace(/\n/g, "<br>")}</p>`;
      }
      return "";
    })
    .join("");

  return formatted || `<p>${content}</p>`;
};

// ==================== SOCIAL SHARE FUNCTIONS ====================

/**
 * SHARE KE WHATSAPP
 * Membuka jendela baru untuk berbagi artikel via WhatsApp
 * @param {Object} blogData - Data artikel yang akan dibagikan
 */
const shareToWhatsApp = (blogData) => {
  const url = window.location.href;
  const text = `Baca artikel: ${blogData.judul}`;
  window.open(
    `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
    "_blank"
  );
};

/**
 * SHARE KE FACEBOOK
 * Membuka jendela baru untuk berbagi artikel via Facebook
 */
const shareToFacebook = () => {
  const url = window.location.href;
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    "_blank"
  );
};

/**
 * SHARE KE TWITTER
 * Membuka jendela baru untuk berbagi artikel via Twitter
 * @param {Object} blogData - Data artikel yang akan dibagikan
 */
const shareToTwitter = (blogData) => {
  const url = window.location.href;
  const text = blogData.judul;
  window.open(
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    "_blank"
  );
};

/**
 * COPY LINK ARTIKEL KE CLIPBOARD
 * Menyalin URL artikel ke clipboard pengguna
 * @param {Ref} linkCopiedRef - Reactive reference untuk status copy
 */
const copyLink = (linkCopiedRef) => {
  const url = window.location.href;
  
  // Gunakan Clipboard API modern
  navigator.clipboard
    .writeText(url)
    .then(() => {
      linkCopiedRef.value = true;
      setTimeout(() => {
        linkCopiedRef.value = false;
      }, 2000);
    })
    .catch(() => {
      // Fallback untuk browser lama
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);

      linkCopiedRef.value = true;
      setTimeout(() => {
        linkCopiedRef.value = false;
      }, 2000);
    });
};

// ==================== LIFECYCLE HOOKS ====================

/**
 * MOUNTED HOOK
 * Fetch data artikel dan scroll ke atas saat komponen dimount
 */
onMounted(() => {
  fetchBlogDetail();
  window.scrollTo(0, 0);
});
</script>

<style scoped src="@/assets/css/blogdetail.css"></style>