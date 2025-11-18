<!-- 
  KOMPONEN VUE - KANG RALING SITE BANJARSARI PAGE
  Deskripsi: Halaman profil dan informasi tentang TPS 3R Binaan
  Tanggal: [15/11/2025]
  Developer: [Danu Tri Anugrah]
-->

<template>
  <div class="tps3r-page">
    <!-- ==================== -->
    <!-- SECTION: NAVIGASI -->
    <!-- ==================== -->
    <Navbar />

    <!-- ==================== -->
    <!-- SECTION: HERO/BANNER -->
    <!-- ==================== -->
    <section class="hero">
      <!-- Overlay untuk kontras teks -->
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <!-- Badge identitas TPS 3R -->
        <div class="hero-badge">TPS 3R Binaan Kang Raling</div>
        <!-- Judul utama halaman -->
        <h1 class="hero-title">
          TPS 3R Banjarsari <br />
          Desa Banjarsari
        </h1>
        <!-- Tagline atau slogan -->
        <p class="hero-subtitle">
          Kita Jaga Bumi, Bumi Jaga Kita
        </p>
      </div>
    </section>

    <!-- ==================== -->
    <!-- SECTION: PROFIL TPS3R -->
    <!-- ==================== -->
    <section class="profil-section">
      <div class="container">
        <!-- Header section dengan judul dan underline -->
        <div class="section-header">
          <h2 class="section-title">Profil TPS 3R</h2>
          <div class="title-underline"></div>
        </div>

        <!-- Grid layout untuk konten profil -->
        <div class="profil-grid">
          <!-- Kartu utama dengan deskripsi lengkap -->
          <div class="profil-card main-card">
            <div class="card-icon">
              <i class="fas fa-recycle"></i>
            </div>
            <h3>Tentang TPS 3R Banjarsari</h3>
            <p class="profil-description">
              {{ tps3rData.description }}
            </p>
          </div>

          <!-- Grid informasi detail TPS 3R -->
          <div class="profil-info-grid">
            <!-- Informasi: Nama TPS 3R -->
            <div class="info-card">
              <div class="info-icon">
                <i class="fas fa-building"></i>
              </div>
              <div class="info-content">
                <p class="info-label">Nama TPS 3R</p>
                <p class="info-value">{{ tps3rData.name }}</p>
              </div>
            </div>

            <!-- Informasi: Pengelola -->
            <div class="info-card">
              <div class="info-icon">
                <i class="fas fa-user-tie"></i>
              </div>
              <div class="info-content">
                <p class="info-label">Pengelola</p>
                <p class="info-value">{{ tps3rData.manager }}</p>
              </div>
            </div>

            <!-- Informasi: Penanggung Jawab -->
            <div class="info-card">
              <div class="info-icon">
                <i class="fas fa-user-tie"></i>
              </div>
              <div class="info-content">
                <p class="info-label">Penanggung Jawab</p>
                <p class="info-value">{{ tps3rData.responsiblePerson }}</p>
              </div>
            </div>

            <!-- Informasi: Alamat Lokasi -->
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

            <!-- Informasi: Jumlah Warga Terlayani -->
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
    <!-- SECTION: PROGRAM KERJA -->
    <!-- ==================== -->
    <section class="program-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Kegiatan & Program Kerja</h2>
          <div class="title-underline"></div>
        </div>

        <!-- Daftar program dengan loop Vue -->
        <div class="program-list">
          <div 
            v-for="program in programs" 
            :key="program.id" 
            class="program-item"
          >
            <!-- Nomor urut program -->
            <div class="program-number">0{{ program.id }}</div>
            <!-- Konten program -->
            <div class="program-content">
              <h4>{{ program.title }}</h4>
              <p>{{ program.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== -->
    <!-- SECTION: DATA PENCAPAIAN -->
    <!-- ==================== -->
    <section class="data-section">
      <div class="container">
        <!-- Header dengan style light untuk background gelap -->
        <div class="section-header light">
          <h2 class="section-title">Data Luaran</h2>
          <div class="title-underline"></div>
          <p class="section-subtitle">
            Capaian dan dampak nyata TPS 3R Banjarsari untuk lingkungan
          </p>
        </div>

        <!-- Grid kartu pencapaian -->
        <div class="data-cards">
          <div 
            v-for="achievement in achievements" 
            :key="achievement.label" 
            class="data-card"
          >
            <!-- Ikon pencapaian -->
            <div class="data-icon">
              <i :class="`fas fa-${achievement.icon}`"></i>
            </div>
            <!-- Nilai angka pencapaian -->
            <div class="data-number">{{ achievement.value }}</div>
            <!-- Label penjelas pencapaian -->
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
          <h2 class="section-title">Fasilitator Desa Banjarsari</h2>
          <div class="title-underline"></div>
        </div>

        <!-- Kartu profil fasilitator -->
        <div class="fasilitator-card">
          <!-- Area foto profil -->
          <div class="fasilitator-image">
            <img
              src="@/assets/icons/profile/fasil_rivan.jpeg"
              alt="Fasilitator"
            />
            <!-- Badge identitas -->
            <div class="image-badge">Fasilitator</div>
          </div>
          <!-- Informasi fasilitator -->
          <div class="fasilitator-info">
            <h3 class="fasilitator-name">{{ facilitator.name }}</h3>
            <p class="fasilitator-position">
              {{ facilitator.position }}
            </p>
            <!-- Daftar kontak dengan click handler -->
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

        <!-- Container untuk embed peta -->
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
 * FUNGSI: Mengelola state dan logic komponen
 */

// Import Vue Composition API
import { ref, computed } from 'vue'
// Import komponen layout
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
// Import data dan functions dari module terpisah
import { 
  tps3rData, 
  getFacilitatorInfo, 
  getPrograms, 
  getAchievements, 
  getMapUrl,
  contactFacilitator 
} from '@/scripts/krsite/banjarsari.js'

export default {
  name: 'BanjarsariPage',
  components: {
    Navbar,
    Footer
  },
  setup() {
    /**
     * REACTIVE DATA INITIALIZATION
     * Menginisialisasi data reactive menggunakan ref()
     */
    
    // Data fasilitator
    const facilitator = ref(getFacilitatorInfo())
    // Daftar program kerja
    const programs = ref(getPrograms())
    // Data pencapaian
    const achievements = ref(getAchievements())
    // URL embed peta
    const mapUrl = ref(getMapUrl())

    // Return data untuk digunakan di template
    return {
      tps3rData,
      facilitator,
      programs,
      achievements,
      mapUrl,
      contactFacilitator
    }
  }
}
</script>

<!-- Import stylesheet terpisah -->
<style scoped src="@/assets/css/krsite/banjarsari.css"></style>