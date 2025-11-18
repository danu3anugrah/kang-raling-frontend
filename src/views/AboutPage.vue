<!-- 
  KOMPONEN HALAMAN TENTANG KAMI (ABOUT PAGE)
  Deskripsi: Halaman profil dan informasi tentang Kang Raling (Kampung Ramah Lingkungan)
  Tanggal: [15/11/2025]
  Developer: [Danu Tri Anugrah]
-->
<template>
  <div class="about-page">
    <Navbar />

    <!-- HERO SECTION -->
    <section class="hero-about">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <div class="hero-badge">
          <i class="bi bi-people"></i>
          <span>Tentang Kami</span>
        </div>
        <h1 class="hero-title">
          Mengenal <span class="gradient-text">Kang Raling</span>
        </h1>
        <p class="hero-subtitle">
          Kampung Ramah Lingkungan untuk Indonesia yang Lebih Bersih dan
          Berkelanjutan
        </p>
      </div>

      <!-- Wave Divider -->
      <div class="wave-divider">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            fill-opacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>

    <!-- MAIN CONTENT -->
    <section class="about-content">
      <div class="container">
        <!-- Introduction Section -->
        <div class="intro-section">
          <div class="intro-grid">
            <div class="intro-image">
              <!-- TEMPAT FOTO KANG RALING -->
              <div class="image-container">
                <img 
                  src="@/assets/images/home/homei.webp" 
                  alt="Logo Kang Raling"
                  class="kang-raling-image"
                  @error="handleImageError"
                />
                <div class="image-fallback" v-if="imageError">
                  <i class="bi bi-image"></i>
                  <p>Logo Kang Raling</p>
                </div>
              </div>
            </div>
            <div class="intro-text">
              <h2 class="section-title">Tentang Kang Raling</h2>
              <p class="text-content">
                <strong>Kang Raling (Kampung Ramah Lingkungan)</strong> adalah Program
                peningkatan peran serta masyarakat dalam pengelolaan sampah dan
                perbaikan lingkungan dengan membangun model pengelolaan sampah
                yang berkelanjutan di tingkat kawasan setingkat RW/Desa
              </p>
              <p class="text-content">
                Sejak didirikan, Kang Raling telah menjadi pelopor dalam gerakan
                pengurangan sampah dan ekonomi sirkular di Kabupaten Garut, Jawa
                Barat. Kami percaya bahwa perubahan dimulai dari hal-hal kecil
                di lingkungan terdekat kita.
              </p>
              <div class="stats-inline">
                <div class="stat-item">
                  <h3>5+</h3>
                  <p>Desa Binaan</p>
                </div>
                <div class="stat-item">
                  <h3>500+</h3>
                  <p>Warga Terlayani</p>
                </div>
                <div class="stat-item">
                  <h3>10 Ton+</h3>
                  <p>Sampah Dikelola</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Values Section -->
        <div class="values-section">
          <h2 class="section-title centered">
            <i class="bi bi-gem"></i>
            Nilai-Nilai Kami
          </h2>

          <div class="values-grid">
            <div class="value-card">
              <div class="value-icon">
                <i class="bi bi-heart-fill"></i>
              </div>
              <h4>Peduli Lingkungan</h4>
              <p>
                Komitmen tinggi terhadap kelestarian alam dan kebersihan
                lingkungan
              </p>
            </div>

            <div class="value-card">
              <div class="value-icon">
                <i class="bi bi-people-fill"></i>
              </div>
              <h4>Kolaboratif</h4>
              <p>
                Bekerja sama dengan semua pihak untuk mencapai tujuan bersama
              </p>
            </div>

            <div class="value-card">
              <div class="value-icon">
                <i class="bi bi-lightbulb-fill"></i>
              </div>
              <h4>Inovatif</h4>
              <p>Selalu mencari solusi kreatif dalam pengelolaan sampah</p>
            </div>

            <div class="value-card">
              <div class="value-icon">
                <i class="bi bi-shield-check"></i>
              </div>
              <h4>Profesional</h4>
              <p>Menjalankan program dengan standar kualitas tinggi</p>
            </div>

            <div class="value-card">
              <div class="value-icon">
                <i class="bi bi-graph-up-arrow"></i>
              </div>
              <h4>Berkelanjutan</h4>
              <p>Memastikan dampak jangka panjang untuk generasi mendatang</p>
            </div>

            <div class="value-card">
              <div class="value-icon">
                <i class="bi bi-hand-thumbs-up-fill"></i>
              </div>
              <h4>Transparan</h4>
              <p>
                Keterbukaan informasi dan akuntabilitas dalam setiap kegiatan
              </p>
            </div>
          </div>
        </div>

        <!-- Timeline Section -->
        <div class="timeline-section">
          <h2 class="section-title centered">
            <i class="bi bi-clock-history"></i>
            Perjalanan Kami
          </h2>

          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <h4>2020</h4>
                <h5>Awal Berdiri</h5>
                <p>
                  Program Kang Raling resmi diluncurkan dengan fokus pada 2 desa
                  percontohan di Kabupaten Garut.
                </p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <h4>2021</h4>
                <h5>Ekspansi Program</h5>
                <p>
                  Perluasan ke 5 desa binaan dengan pembangunan TPS3R dan
                  pelatihan intensif untuk warga.
                </p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <h4>2022</h4>
                <h5>Inovasi Digital</h5>
                <p>
                  Peluncuran website dan sistem pencatatan digital untuk
                  monitoring data sampah real-time.
                </p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <h4>2023</h4>
                <h5>Pengembangan Produk</h5>
                <p>
                  Membuka Kang Raling Store dengan produk-produk hasil daur
                  ulang berkualitas tinggi.
                </p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <h4>2024-2025</h4>
                <h5>Masa Kini</h5>
                <p>
                  Terus berkembang dengan lebih banyak desa binaan, program
                  edukasi, dan dampak positif untuk lingkungan.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Team Section - REVISI: Center alignment untuk jumlah ganjil + tempat foto -->
        <div class="team-section">
          <h2 class="section-title centered">
            <i class="bi bi-person-badge"></i>
            Tim Kami
          </h2>

          <div class="team-grid" :class="teamGridClass">

            <!-- Team Member 2 -->
            <div class="team-card">
              <div class="team-avatar">
                <img 
                  src="@/assets/icons/profile/kadis.jpg"
                  alt="Tini Martini Tapran"
                  class="team-photo"
                  @error="handleTeamPhotoError(1)"
                />
                <div class="team-photo-fallback" v-if="teamPhotoErrors[1]">
                  <i class="bi bi-person-circle"></i>
                </div>
              </div>
              <h4>Tini Martini Tapran, S.Si., M.Sos.</h4>
              <p class="team-role">Koordinator Fasilitator</p>
            </div>

            <!-- Team Member 3 -->
            <div class="team-card">
              <div class="team-avatar">
                <img 
                  src="@/assets/icons/profile/fasil_iqbal.jpeg"
                  alt="Iqbal Akbar Mujahid Akbar, S.E."
                  class="team-photo"
                  @error="handleTeamPhotoError(2)"
                />
                <div class="team-photo-fallback" v-if="teamPhotoErrors[2]">
                  <i class="bi bi-person-circle"></i>
                </div>
              </div>
              <h4>Iqbal Akbar</h4>
              <p class="team-role">Fasilitator</p>
            </div>

            <!-- Team Member 4 -->
            <div class="team-card">
              <div class="team-avatar">
                <img 
                  src="@/assets/icons/profile/fasil_rivan.jpeg"
                  alt="Rivan Alawi, S.Hut."
                  class="team-photo"
                  @error="handleTeamPhotoError(3)"
                />
                <div class="team-photo-fallback" v-if="teamPhotoErrors[3]">
                  <i class="bi bi-person-circle"></i>
                </div>
              </div>
              <h4>Rivan Alawi</h4>
              <p class="team-role">Fasilitator</p>
            </div>

            <!-- Team Member 5 -->
            <div class="team-card">
              <div class="team-avatar">
                <img 
                  src="@/assets/icons/profile/fasil_rifki.jpg"
                  alt="Rifki Akbar, S.Kom."
                  class="team-photo"
                  @error="handleTeamPhotoError(4)"
                />
                <div class="team-photo-fallback" v-if="teamPhotoErrors[4]">
                  <i class="bi bi-person-circle"></i>
                </div>
              </div>
              <h4>Rifki Akbar</h4>
              <p class="team-role">Fasilitator</p>
            </div>

            <!-- Team Member 6 -->
            <div class="team-card">
              <div class="team-avatar">
                <img 
                  src="@/assets/icons/profile/fasil_elni.jpeg"
                  alt="Elni Pujayanti, S.H."
                  class="team-photo"
                  @error="handleTeamPhotoError(5)"
                />
                <div class="team-photo-fallback" v-if="teamPhotoErrors[5]">
                  <i class="bi bi-person-circle"></i>
                </div>
              </div>
              <h4>Elni Pujayanti</h4>
              <p class="team-role">Fasilitator</p>
            </div>

            <!-- Team Member 7 -->
            <div class="team-card">
              <div class="team-avatar">
                <img 
                  src="@/assets/icons/profile/kadis.jpg"
                  alt="Iman Septiana"
                  class="team-photo"
                  @error="handleTeamPhotoError(6)"
                />
                <div class="team-photo-fallback" v-if="teamPhotoErrors[6]">
                  <i class="bi bi-person-circle"></i>
                </div>
              </div>
              <h4>Iman Septiana</h4>
              <p class="team-role">Fasilitator</p>
            </div>
          </div>
        </div>

        <!-- Contact CTA -->
        <div class="contact-cta">
          <div class="cta-content">
            <div class="cta-icon">
              <i class="bi bi-envelope-heart"></i>
            </div>
            <div class="cta-text">
              <h3>Tertarik Bergabung atau Berkolaborasi?</h3>
              <p>
                Hubungi kami untuk informasi lebih lanjut tentang program dan
                kemitraan
              </p>
            </div>
            <a href="/contact" class="btn-cta">
              Hubungi Kami
              <i class="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
// IMPORT COMPONENTS DAN DEPENDENCIES
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import { ref, computed } from "vue";

// IMPORT CSS STYLESHEET
import '@/assets/css/about.css';

// State untuk handle error loading image
const imageError = ref(false);
const teamPhotoErrors = ref(Array(7).fill(false)); // Untuk 7 anggota tim

/**
 * Handle error ketika gambar Kang Raling gagal load
 * Fallback ke placeholder
 */
const handleImageError = () => {
  imageError.value = true;
};

/**
 * Handle error ketika foto tim gagal load
 * @param {number} index - Index anggota tim
 */
const handleTeamPhotoError = (index) => {
  teamPhotoErrors.value[index] = true;
};

/**
 * Computed property untuk center alignment team grid
 * Mengatur layout agar terlihat rapi dengan jumlah ganjil
 */
const teamGridClass = computed(() => {
  const teamCount = 7; // Total 7 anggota tim
  return teamCount % 2 !== 0 ? 'team-grid-centered' : 'team-grid';
});
</script>