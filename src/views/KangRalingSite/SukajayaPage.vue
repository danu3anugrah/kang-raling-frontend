/* 
    KOMPONEN VUE - HALAMAN TPS 3R BASMALLAH
    Deskripsi: Komponen utama halaman tentang TPS 3R Basmallah Desa Sukajaya
    Tanggal: [15/11/2024]
    Developer: [Danu Tri Anugrah]
*/

<template>
  <div class="tps3r-page">
    <!-- ==================== -->
    <!-- SECTION: NAVIGASI -->
    <!-- ==================== -->
    <!-- Komponen navbar untuk navigasi utama website -->
    <Navbar />

    <!-- ==================== -->
    <!-- SECTION: HERO/BANNER UTAMA -->
    <!-- ==================== -->
    <section class="hero">
      <!-- Overlay gelap untuk meningkatkan kontras teks dengan background image -->
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <!-- Badge identitas menunjukkan afiliasi dengan Kang Raling -->
        <div class="hero-badge">TPS 3R Binaan Kang Raling</div>
        <!-- Judul utama dengan nama TPS 3R dan desa -->
        <h1 class="hero-title">
          TPS 3R Basmallah <br />
          Desa Sukajaya
        </h1>
        <!-- Tagline yang menekankan kolaborasi dan kebersamaan -->
        <p class="hero-subtitle">
          Bersama Mengelola, Bersama Menjaga: Wujudkan Lingkungan Bersih dan Tertata.
        </p>
      </div>
    </section>

    <!-- ==================== -->
    <!-- SECTION: PROFIL TPS3R -->
    <!-- ==================== -->
    <section class="profil-section">
      <div class="container">
        <!-- Header section dengan judul dan garis dekoratif -->
        <div class="section-header">
          <h2 class="section-title">Profil TPS 3R</h2>
          <div class="title-underline"></div>
        </div>

        <!-- Grid layout untuk menampilkan informasi profil secara terorganisir -->
        <div class="profil-grid">
          <!-- Kartu utama dengan background gradient dan deskripsi lengkap -->
          <div class="profil-card main-card">
            <div class="card-icon">
              <!-- Ikon recycle sebagai simbol pengelolaan sampah -->
              <i class="fas fa-recycle"></i>
            </div>
            <h3>Tentang TPS 3R Motekar</h3>
            <p class="profil-description">
              <!-- Data deskripsi diambil dari JavaScript module -->
              {{ tps3rData.description }}
            </p>
          </div>

          <!-- Grid sidebar untuk informasi detail TPS 3R -->
          <div class="profil-info-grid">
            <!-- Kartu informasi: Nama Resmi TPS 3R -->
            <div class="info-card">
              <div class="info-icon">
                <i class="fas fa-building"></i>
              </div>
              <div class="info-content">
                <p class="info-label">Nama TPS 3R</p>
                <p class="info-value">{{ tps3rData.name }}</p>
              </div>
            </div>

            <!-- Kartu informasi: Organisasi Pengelola -->
            <div class="info-card">
              <div class="info-icon">
                <i class="fas fa-user-tie"></i>
              </div>
              <div class="info-content">
                <p class="info-label">Pengelola</p>
                <p class="info-value">{{ tps3rData.manager }}</p>
              </div>
            </div>

            <!-- Kartu informasi: Individu Penanggung Jawab -->
            <div class="info-card">
              <div class="info-icon">
                <i class="fas fa-user-tie"></i>
              </div>
              <div class="info-content">
                <p class="info-label">Penanggung Jawab</p>
                <p class="info-value">{{ tps3rData.responsiblePerson }}</p>
              </div>
            </div>

            <!-- Kartu informasi: Alamat Lengkap Lokasi -->
            <div class="info-card">
              <div class="info-icon">
                <i class="fas fa-map-marker-alt"></i>
              </div>
              <div class="info-content">
                <p class="info-label">Alamat</p>
                <p class="info-value">
                  {{ tps3rData.location }}
                </p>
              </div>
            </div>

            <!-- Kartu informasi: Cakupan Layanan Masyarakat -->
            <div class="info-card">
              <div class="info-icon">
                <i class="fas fa-users"></i>
              </div>
              <div class="info-content">
                <p class="info-label">Warga Terlayani</p>
                <p class="info-value">{{ tps3rData.familiesServed }}+ Keluarga</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== -->
    <!-- SECTION: KEGIATAN & PROGRAM KERJA -->
    <!-- ==================== -->
    <section class="program-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Kegiatan & Program Kerja</h2>
          <div class="title-underline"></div>
        </div>

        <!-- Daftar program menggunakan v-for untuk rendering dinamis -->
        <div class="program-list">
          <div 
            v-for="program in programs" 
            :key="program.id" 
            class="program-item"
          >
            <!-- Nomor urut program dengan format leading zero -->
            <div class="program-number">0{{ program.id }}</div>
            <!-- Konten program termasuk judul dan deskripsi -->
            <div class="program-content">
              <h4>{{ program.title }}</h4>
              <p>{{ program.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== -->
    <!-- SECTION: DATA LUARAN / PENCAPAIAN -->
    <!-- ==================== -->
    <section class="data-section">
      <div class="container">
        <!-- Header dengan variant light untuk kontras pada background gelap -->
        <div class="section-header light">
          <h2 class="section-title">Data Luaran</h2>
          <div class="title-underline"></div>
          <!-- Subtitle yang menjelaskan konteks data -->
          <p class="section-subtitle">
            Capaian dan dampak nyata TPS 3R Basmallah untuk lingkungan
          </p>
        </div>

        <!-- Grid kartu pencapaian dengan data statistik -->
        <div class="data-cards">
          <div 
            v-for="achievement in achievements" 
            :key="achievement.label" 
            class="data-card"
          >
            <!-- Ikon visual untuk setiap jenis pencapaian -->
            <div class="data-icon">
              <i :class="`fas fa-${achievement.icon}`"></i>
            </div>
            <!-- Nilai numerik pencapaian (contoh: "450+", "3.5+ Ton") -->
            <div class="data-number">{{ achievement.value }}</div>
            <!-- Label deskriptif untuk pencapaian -->
            <div class="data-label">{{ achievement.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== -->
    <!-- SECTION: FASILITATOR -->
    <!-- ==================== -->
    <section class="fasilitator-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Fasilitator Desa Sukajaya</h2>
          <div class="title-underline"></div>
        </div>

        <!-- Kartu profil fasilitator dengan layout grid -->
        <div class="fasilitator-card">
          <!-- Area foto profil -->
          <div class="fasilitator-image">
            <img
              src="@/assets/icons/profile/fasilitator.jpg"
              alt="Fasilitator"
            />
            <!-- Badge identitas sebagai fasilitator -->
            <div class="image-badge">Fasilitator</div>
          </div>
          <!-- Informasi detail fasilitator -->
          <div class="fasilitator-info">
            <h3 class="fasilitator-name">{{ facilitator.name }}</h3>
            <p class="fasilitator-position">
              {{ facilitator.position }}
            </p>
            <!-- Daftar kontak dengan fungsi interaktif -->
            <div class="fasilitator-contacts">
              <!-- Item telepon dengan click handler -->
              <div 
                class="contact-item" 
                @click="contactFacilitator('phone', facilitator.phone)"
              >
                <i class="fas fa-phone"></i>
                <span>{{ facilitator.phone }}</span>
              </div>
              <!-- Item email dengan click handler -->
              <div 
                class="contact-item"
                @click="contactFacilitator('email', facilitator.email)"
              >
                <i class="fas fa-envelope"></i>
                <span>{{ facilitator.email }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== -->
    <!-- SECTION: LOKASI PETA -->
    <!-- ==================== -->
    <section class="lokasi-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Lokasi TPS 3R</h2>
          <div class="title-underline"></div>
          <p class="section-subtitle">
            Temukan kami di peta dan kunjungi langsung
          </p>
        </div>

        <!-- Container untuk embed peta Google Maps -->
        <div class="map-container">
          <iframe
            :src="mapUrl"
            allowfullscreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>

    <!-- ==================== -->
    <!-- SECTION: FOOTER -->
    <!-- ==================== -->
    <Footer />
  </div>
</template>

<script>
/**
 * SCRIPT SECTION - VUE COMPOSITION API
 * FUNGSI: Mengelola state, data, dan business logic komponen
 * TEKNOLOGI: Vue 3 Composition API dengan reactive programming
 */

// Import fungsi reactive dari Vue
import { ref, computed } from 'vue'
// Import komponen layout reusable
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
// Import data dan functions dari module JavaScript khusus Sukajaya
import { 
  tps3rData, 
  getFacilitatorInfo, 
  getPrograms, 
  getAchievements, 
  getMapUrl,
  contactFacilitator 
} from '@/scripts/krsite/sukajaya.js'

export default {
  // Nama komponen untuk debugging dan devtools
  name: 'SukajayaPage',
  // Registrasi komponen child
  components: {
    Navbar,
    Footer
  },
  /**
   * SETUP FUNCTION - Vue Composition API
   * Dijalankan sebelum instance komponen dibuat
   * Mengembalikan object yang akan tersedia di template
   */
  setup() {
    /**
     * REACTIVE DATA INITIALIZATION
     * Menggunakan ref() untuk membuat data reactive
     */
    
    // Data fasilitator yang akan berubah reactive
    const facilitator = ref(getFacilitatorInfo())
    // Daftar program kerja yang reactive
    const programs = ref(getPrograms())
    // Data pencapaian/statistik yang reactive
    const achievements = ref(getAchievements())
    // URL peta yang reactive
    const mapUrl = ref(getMapUrl())

    // Return semua data dan methods untuk diakses template
    return {
      tps3rData,           // Data statis TPS 3R Basmallah
      facilitator,         // Data fasilitator Desa Sukajaya
      programs,            // Daftar program dan kegiatan
      achievements,        // Data pencapaian dan luaran
      mapUrl,              // URL embed peta lokasi
      contactFacilitator   // Function untuk menghubungi fasilitator
    }
  }
}
</script>

<!-- Import stylesheet external untuk styling yang konsisten -->
<style scoped src="@/assets/css/krsite/sukajaya.css"></style>