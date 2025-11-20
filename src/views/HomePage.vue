<!-- 
  KOMPONEN HALAMAN UTAMA WEBSITE KANG RALING
  Deskripsi: Komponen utama untuk halaman depan website Kampung Ramah Lingkungan
  Tanggal: [15/11/2025]
  Developer: [Danu Tri Anugrah]
-->

<template>
  <div class="homepage">
    <!-- KOMPONEN NAVBAR -->
    <Navbar />

    <!-- ==================== SECTION 1: HERO LANDING ==================== -->
    <!-- Section utama dengan background gradient dan animasi -->
    <section class="hero-landing">
      <!-- Overlay untuk efek visual -->
      <div class="hero-overlay"></div>

      <!-- Container utama hero section -->
      <div class="hero-container">
        <!-- Bagian visual/logo -->
        <div class="hero-visual">
          <img
            src="@/assets/images/logo_kangraling.webp"
            alt="3R Animation"
            class="hero-animation"
          />
        </div>

        <!-- Bagian konten teks dan CTA -->
        <div class="hero-content">
          <h1 class="hero-title">
            <span class="gradient-text"> Kampung<br />Ramah Lingkungan</span>
          </h1>
          <p class="hero-subtitle">
            Kurangi, Pilah, dan Kelola Sampah.<br />
            Dari Kang Raling untuk Garut yang Berkelanjutan.
          </p>
          <!-- Tombol untuk scroll ke section intro -->
          <button class="btn-hero" @click="scrollToSection('intro')">
            Pelajari Lebih Lanjut
            <i class="bi bi-arrow-down"></i>
          </button>
        </div>
      </div>

      <!-- Wave divider untuk transisi ke section berikutnya -->
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

    <!-- ==================== SECTION 2: INTRODUCTION ==================== -->
    <!-- Section tentang Kang Raling -->
    <section class="intro-section" id="intro">
      <div class="container">
        <!-- Header section -->
        <div class="intro-header">
          <div class="section-badge">
            <i class="bi bi-info-circle"></i>
            <span>Tentang Kami</span>
          </div>
          <h2 class="section-title">Solusi Digital Kang Raling</h2>
          <p class="section-desc">
            hadir sebagai platform inovatif untuk transformasi pengelolaan
            sampah berbasis digital di Kabupaten Garut.
          </p>
        </div>

        <!-- Konten section (gambar + teks) -->
        <div class="intro-content">
          <div class="intro-left">
            <img
              src="@/assets/images/home/homie.webp"
              alt="Logo Kang Raling"
              class="intro-logo"
            />
          </div>
          <div class="intro-right">
            <!-- Deskripsi tentang Kang Raling -->
            <p class="intro-text">
              Platform ini mengintegrasikan tiga pilar utama:
              <strong>Edukasi</strong> melalui konten pembelajaran interaktif,
              <strong>Publikasi</strong> kemajuan dan best practices pengelolaan
              sampah, serta <strong>Monitoring Real-time</strong> data timbulan
              sampah yang terupdate.
            </p>
            <p class="intro-text">
              Dilengkapi dengan sistem pemantauan terintegrasi, Kang Raling
              Digital memungkinkan pelacakan data timbulan sampah, memberikan
              insight yang akurat untuk pengambilan keputusan dan evaluasi
              kinerja pengelolaan sampah yang lebih efektif.
            </p>
            <p class="intro-text">
              Pada tahun 2025 ini, platform digital Kang Raling telah
              diimplementasikan di lima lokasi binaan:
              <strong>Desa Mekargalih</strong> (Kec. Tarogong Kidul),
              <strong>Desa Pakuwon</strong> (Kec. Cisurupan),
              <strong>Desa Banjar Sari</strong>, <strong>Desa Sukajaya</strong>,
              dan <strong>Desa Muara Sanding</strong> - yang semuanya telah
              memiliki fasilitas pengelolaan sampah berbasis TPS 3R yang
              terhubung dalam sistem digital terpadu.
            </p>

            <!-- Highlight/fitur utama -->
            <div class="intro-highlights">
              <div class="highlight-item">
                <i class="bi bi-check-circle-fill"></i>
                <span>Pengelolaan Sampah Terpadu</span>
              </div>
              <div class="highlight-item">
                <i class="bi bi-check-circle-fill"></i>
                <span>Pemberdayaan Masyarakat</span>
              </div>
              <div class="highlight-item">
                <i class="bi bi-check-circle-fill"></i>
                <span>Inovasi Berkelanjutan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== SECTION 3: PILAR ==================== -->
    <!-- Section 4 pilar utama Kang Raling -->
    <section class="pilar-section" id="pilar">
      <div class="container">
        <!-- Header section -->
        <div class="section-header-center">
          <div class="section-badge light">
            <i class="bi bi-columns-gap"></i>
            <span>Pilar Kang Raling</span>
          </div>
          <h2 class="section-title light">Wujudkan Gaya Hidup Berkelanjutan</h2>
          <p class="section-desc light">
            Menerapkan prinsip 3R dan pengurangan jejak karbon untuk lingkungan
            yang lebih baik
          </p>
        </div>

        <!-- Grid 4 pilar -->
        <div class="pilar-grid">
          <!-- Pilar 1: Reduce -->
          <div class="pilar-card" data-aos="fade-up" data-aos-delay="0">
            <div class="pilar-number">01</div>
            <div class="pilar-icon-wrapper">
              <img src="@/assets/icons/home/pilar_01.webp" alt="Reduce" />
            </div>
            <h3>Kurangi Sampah</h3>
            <p class="pilar-subtitle"><strong>Gunakan wadah sendiri dan hindari plastik sekali pakai untuk mengurangi timbulan sampah dari sumbernya.</strong></p>
          </div>

          <!-- Pilar 2: Reuse -->
          <div class="pilar-card" data-aos="fade-up" data-aos-delay="100">
            <div class="pilar-number">02</div>
            <div class="pilar-icon-wrapper">
              <img src="@/assets/icons/home/pisahkan.webp" alt="Reuse" />
            </div>
            <h3>Pisahkan Sampah</h3>
            <p class="pilar-subtitle"><strong>Pisahkan sampah organik, anorganik, dan residu agar lebih mudah dikelola dan didaur ulang.</strong></p>
          </div>

          <!-- Pilar 3: Recycle -->
          <div class="pilar-card" data-aos="fade-up" data-aos-delay="200">
            <div class="pilar-number">03</div>
            <div class="pilar-icon-wrapper">
              <img src="@/assets/icons/home/manfaatkan.webp" alt="Recycle" />
            </div>
            <h3>Manfaatkan Sampah</h3>
            <p class="pilar-subtitle"><strong>Ubah sampah menjadi kompos atau barang daur ulang agar memiliki nilai dan tidak terbuang percuma.</strong></p>
          </div>

          <!-- Pilar 4: Carbon Reduction -->
          <!-- <div class="pilar-card" data-aos="fade-up" data-aos-delay="300">
            <div class="pilar-number">04</div>
            <div class="pilar-icon-wrapper">
              <img src="@/assets/icons/home/pilar_04.webp" alt="Carbon" />
            </div>
            <h3>Carbon Reduction</h3>
            <p class="pilar-subtitle"><strong>Kurangi Jejak Karbon</strong></p>
            <p>
              Lakukan hal kecil seperti menanam pohon dan hemat energi untuk
              bantu jaga bumi.
            </p>
          </div> -->
        </div>
      </div>
    </section>

    <!-- ==================== SECTION 4: MISI ==================== -->
    <!-- Section misi Kang Raling -->
    <section class="misi-section" id="misi">
      <div class="container">
        <!-- Header section -->
        <div class="section-header-center">
          <div class="section-badge light">
            <i class="bi bi-bullseye"></i>
            <span>Misi Kang Raling</span>
          </div>
          <h2 class="section-title light">Bergerak Bersama Masyarakat</h2>
          <p class="section-desc light">
            Mengelola sampah secara cerdas, kreatif, dan berkelanjutan
          </p>
        </div>

        <!-- Grid 4 misi -->
        <div class="misi-grid">
          <!-- Misi 1: Mengurangi Sampah -->
          <div class="misi-card" data-aos="zoom-in" data-aos-delay="0">
            <div class="misi-number">01</div>
            <div class="misi-icon-wrapper">
              <img src="@/assets/icons/home/misi_01.webp" alt="Mengurangi" />
            </div>
            <h3>Mengurangi Sampah</h3>
            <p>
              Ajak masyarakat membawa wadah sendiri dan bijak dalam penggunaan
              plastik.
            </p>
          </div>

          <!-- Misi 2: Memisahkan Sampah -->
          <div class="misi-card" data-aos="zoom-in" data-aos-delay="100">
            <div class="misi-number">02</div>
            <div class="misi-icon-wrapper">
              <img src="@/assets/icons/home/misi_02.webp" alt="Pisahkan" />
            </div>
            <h3>Memisahkan Sampah</h3>
            <p>
              Mulai dari rumah dan pisahkan sampah organik dan anorganik agar
              mudah dikelola.
            </p>
          </div>

          <!-- Misi 3: Memanfaatkan Sampah -->
          <div class="misi-card" data-aos="zoom-in" data-aos-delay="200">
            <div class="misi-number">03</div>
            <div class="misi-icon-wrapper">
              <img src="@/assets/icons/home/misi_03.webp" alt="Manfaatkan" />
            </div>
            <h3>Memanfaatkan Sampah</h3>
            <p>
              Jadikan sampah bernilai lewat ide kreatif dan daur ulang bersama
              warga.
            </p>
          </div>

          <!-- Misi 4: Ramah Lingkungan -->
          <div class="misi-card" data-aos="zoom-in" data-aos-delay="300">
            <div class="misi-number">04</div>
            <div class="misi-icon-wrapper">
              <img src="@/assets/icons/home/misi_04.webp" alt="Ramah" />
            </div>
            <h3>Ramah Lingkungan</h3>
            <p>Hidup lebih bersih, hijau, dan peduli pada alam sekitar.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== SECTION 5: STATISTIK ==================== -->
    <!-- Section menampilkan statistik capaian -->
    <section class="stats-section">
      <div class="container">
        <!-- Header section -->
        <div class="section-header-center">
          <div class="section-badge">
            <i class="bi bi-graph-up"></i>
            <span>Statistik</span>
          </div>
          <h2 class="section-title">Capaian Kang Raling</h2>
          <p class="section-desc">
            Data pengelolaan bersama masyarakat untuk lingkungan yang lebih
            bersih
          </p>
        </div>

        <!-- Grid statistik -->
        <div class="stats-grid">
          <!-- Statistik 1: Sampah Dikelola -->
          <div class="stat-card" data-aos="fade-up" data-aos-delay="0">
            <div class="stat-icon">
              <i class="bi bi-trash"></i>
            </div>
            <div class="stat-number">1000+</div>
            <div class="stat-label">Ton Sampah Dikelola</div>
          </div>

          <!-- Statistik 2: Desa Binaan -->
          <div class="stat-card" data-aos="fade-up" data-aos-delay="100">
            <div class="stat-icon">
              <i class="bi bi-house-heart"></i>
            </div>
            <div class="stat-number">5+</div>
            <div class="stat-label">Desa Binaan</div>
          </div>

          <!-- Statistik 3: Masyarakat Diberdayakan -->
          <div class="stat-card" data-aos="fade-up" data-aos-delay="200">
            <div class="stat-icon">
              <i class="bi bi-people"></i>
            </div>
            <div class="stat-number">20+</div>
            <div class="stat-label">Masyarakat Diberdayakan</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== SECTION 6: BINAAN DESA ==================== -->
    <!-- Section menampilkan video dokumentasi -->
    <section class="binaan-section">
      <div class="container">
        <!-- Header section -->
        <div class="section-header-center">
          <div class="section-badge">
            <i class="bi bi-camera-video"></i>
            <span>Dokumentasi</span>
          </div>
          <h2 class="section-title">Binaan Desa Kang Raling</h2>
          <p class="section-desc">
            Dokumentasi kegiatan dan binaan Kang Raling di berbagai desa
          </p>
        </div>

        <!-- Video container -->
        <div class="video-container">
          <div class="video-wrapper">
            <!-- Embed video dari Google Drive -->
            <iframe
              src="https://drive.google.com/file/d/1A10imD8uqhAsqoabJyLqXb4LJx1u0BNw/preview"
              allow="autoplay; fullscreen"
              allowfullscreen
            ></iframe>
          </div>
          <!-- Keterangan video -->
          <p class="video-caption">
            <i class="bi bi-play-circle"></i>
            Dokumenter: Desa Binaan Kang Raling - Cilanjung Hijau
          </p>
        </div>
      </div>
    </section>

    <!-- ==================== SECTION 7: PARTNER ==================== -->
    <!-- Section menampilkan partner kolaborasi -->
    <section class="partner-section">
      <div class="container">
        <!-- Header section -->
        <div class="section-header-center">
          <div class="section-badge">
            <i class="bi bi-handshake"></i>
            <span>Kolaborasi</span>
          </div>
          <h2 class="section-title">Partner Kolaborasi</h2>
        </div>

        <!-- Grid logo partner -->
        <div class="partner-grid">
          <!-- Partner 1: DLH Garut -->
          <a
            href="https://dlhkabgarut.org/"
            target="_blank"
            class="partner-card"
          >
            <img src="@/assets/images/home/logo_dlh.webp" alt="DLH Garut" />
          </a>

          <!-- Partner 2: Pemkab Garut -->
          <a
            href="https://www.garutkab.go.id/"
            target="_blank"
            class="partner-card"
          >
            <img
              src="@/assets/images/home/logo_pemkab.webp"
              alt="Kabupaten Garut"
            />
          </a>
        </div>
      </div>
    </section>

    <!-- KOMPONEN FOOTER -->
    <Footer />
  </div>
</template>

<script>
import { onMounted } from "vue";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "HomePage",
  components: {
    Navbar,
    Footer,
  },
  setup() {
    /**
     * FUNGSI UNTUK SCROLL SMOOTH KE SECTION TERTENTU
     * @param {string} id - ID element yang dituju
     */
    const scrollToSection = (id) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };

    return {
      scrollToSection,
    };
  },
};
</script>

<!-- IMPORT FILE CSS EKSTERNAL -->
<style scoped src="@/assets/css/home.css"></style>
