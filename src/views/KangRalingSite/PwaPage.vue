<!-- 
  KOMPONEN VUE - KANG RALING SITE PWA-GSI PAGE
  Deskripsi: Halaman profil dan informasi tentang TPS 3R Binaan
  Tanggal: [15/11/2025]
  Developer: [Danu Tri Anugrah]
-->

<template>
  <div class="tps3r-page">
    <!-- ==================== -->
    <!-- SECTION: NAVIGASI -->
    <!-- ==================== -->
    <!-- Komponen navbar untuk navigasi website -->
    <Navbar />

    <!-- ==================== -->
    <!-- SECTION: HERO/BANNER UTAMA -->
    <!-- ==================== -->
    <section class="hero">
      <!-- Overlay gelap untuk meningkatkan kontras dan readability teks -->
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <!-- Badge identitas menunjukkan TPS 3R merupakan binaan Kang Raling -->
        <div class="hero-badge">TPS 3R Binaan Kang Raling</div>
        <!-- Judul utama halaman dengan nama TPS 3R dan desa -->
        <h1 class="hero-title">
          TPS 3R PWA - GSI <br />
          Peacesantren Welas Asih
        </h1>
        <!-- Tagline atau slogan yang mencerminkan visi TPS 3R -->
        <p class="hero-subtitle">
          Olah Sampah Jadi Berkah Bersama Bangun Perubahan Positif.
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

        <!-- Grid layout untuk menampilkan informasi profil -->
        <div class="profil-grid">
          <!-- Kartu utama berisi deskripsi lengkap TPS 3R -->
          <div class="profil-card main-card">
            <div class="card-icon">
              <i class="fas fa-recycle"></i>
            </div>
            <h3>Tentang TPS 3R PWA - GSI</h3>
            <p class="profil-description">
              {{ tps3rData.description }}
            </p>
          </div>

          <!-- Grid untuk informasi detail TPS 3R -->
          <div class="profil-info-grid">
            <!-- Kartu informasi: Nama TPS 3R -->
            <div class="info-card">
              <div class="info-icon">
                <i class="fas fa-building"></i>
              </div>
              <div class="info-content">
                <p class="info-label">Nama TPS 3R</p>
                <p class="info-value">{{ tps3rData.name }}</p>
              </div>
            </div>

            <!-- Kartu informasi: Pengelola TPS 3R -->
            <div class="info-card">
              <div class="info-icon">
                <i class="fas fa-user-tie"></i>
              </div>
              <div class="info-content">
                <p class="info-label">Pengelola</p>
                <p class="info-value">{{ tps3rData.manager }}</p>
              </div>
            </div>

            <!-- Kartu informasi: Penanggung Jawab -->
            <div class="info-card">
              <div class="info-icon">
                <i class="fas fa-user-tie"></i>
              </div>
              <div class="info-content">
                <p class="info-label">Penanggung Jawab</p>
                <p class="info-value">{{ tps3rData.responsiblePerson }}</p>
              </div>
            </div>

            <!-- Kartu informasi: Alamat Lokasi -->
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

            <!-- Kartu informasi: Jumlah Warga yang Terlayani -->
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

        <!-- Daftar program kerja menggunakan v-for untuk render dinamis -->
        <div class="program-list">
          <div 
            v-for="program in programs" 
            :key="program.id" 
            class="program-item"
          >
            <!-- Nomor urut program dengan format 01, 02, dst -->
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
        <!-- Header dengan variant light untuk background gelap -->
        <div class="section-header light">
          <h2 class="section-title">Data Luaran</h2>
          <div class="title-underline"></div>
          <p class="section-subtitle">
            Capaian dan dampak nyata TPS 3R PWA - GSI untuk lingkungan
          </p>
        </div>

        <!-- Grid kartu pencapaian dengan data statistik -->
        <div class="data-cards">
          <div 
            v-for="achievement in achievements" 
            :key="achievement.label" 
            class="data-card"
          >
            <!-- Ikon representasi dari setiap pencapaian -->
            <div class="data-icon">
              <i :class="`fas fa-${achievement.icon}`"></i>
            </div>
            <!-- Nilai numerik dari pencapaian -->
            <div class="data-number">{{ achievement.value }}</div>
            <!-- Label penjelas untuk pencapaian -->
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
          <h2 class="section-title">Fasilitator PWA - GSI</h2>
          <div class="title-underline"></div>
        </div>

        <!-- Kartu profil fasilitator -->
        <div class="fasilitator-card">
          <!-- Area foto profil fasilitator -->
          <div class="fasilitator-image">
            <img
              src="@/assets/icons/profile/fasil_tini.png"
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
            <!-- Daftar kontak dengan event handler untuk aksi kontak -->
            <div class="fasilitator-contacts">
              <div 
                class="contact-item" 
                @click="contactFacilitator('phone', facilitator.phone)"
              >
                <i class="fas fa-phone"></i>
                <span>{{ facilitator.phone }}</span>
              </div>
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
 * FUNGSI: Mengelola state, data, dan logic komponen
 * TEKNOLOGI: Vue 3 Composition API
 */

// Import fungsi reactive dari Vue
import { ref, computed } from 'vue'
// Import komponen layout
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
// Import data dan functions dari module JavaScript terpisah
import { 
  tps3rData, 
  getFacilitatorInfo, 
  getPrograms, 
  getAchievements, 
  getMapUrl,
  contactFacilitator 
} from '@/scripts/krsite/pwa.js'

export default {
  name: 'PwaPage',
  components: {
    Navbar,
    Footer
  },
  /**
   * SETUP FUNCTION - Vue Composition API
   * Fungsi ini dijalankan sebelum komponen dibuat
   * Mengembalikan semua data dan methods yang akan digunakan di template
   */
  setup() {
    // Reactive data initialization menggunakan ref()
    
    // Data fasilitator yang reactive
    const facilitator = ref(getFacilitatorInfo())
    // Daftar program kerja yang reactive
    const programs = ref(getPrograms())
    // Data pencapaian yang reactive
    const achievements = ref(getAchievements())
    // URL peta yang reactive
    const mapUrl = ref(getMapUrl())

    // Return semua data dan methods untuk digunakan di template
    return {
      tps3rData,           // Data statis TPS 3R
      facilitator,         // Data fasilitator
      programs,            // Daftar program
      achievements,        // Data pencapaian
      mapUrl,              // URL peta
      contactFacilitator   // Function untuk menghubungi fasilitator
    }
  }
}
</script>

<!-- Import stylesheet external untuk styling komponen -->
<style scoped src="@/assets/css/krsite/pwa.css"></style>