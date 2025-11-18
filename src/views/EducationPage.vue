<!-- 
  KOMPONEN HALAMAN EDUKASI
  Deskripsi: Halaman untuk menampilkan materi edukasi pengelolaan sampah
  Tanggal: [15/11/2025]
  Developer: [Danu Tri Anugrah]
-->

<template>
  <div class="education-page">
    <Navbar />

    <!-- ==================== SECTION 1: HERO EDUCATION ==================== -->
    <!-- Section header dengan background dan informasi utama -->
    <section class="hero-education">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <!-- Badge identifikasi section -->
        <div class="hero-badge">
          <i class="bi bi-book"></i>
          <span>Edukasi Kang Raling</span>
        </div>

        <!-- Title dan subtitle -->
        <h1 class="hero-title">
          Pusat Pembelajaran <br />
          <span class="gradient-text">Pengelolaan Sampah</span>
        </h1>
        <p class="hero-subtitle">
          Akses koleksi e-book dan video edukatif untuk meningkatkan <br />
          pengetahuan Anda tentang pengelolaan sampah berkelanjutan
        </p>
      </div>

      <!-- Wave divider untuk transisi visual -->
      <div class="wave-divider">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#f8f9fa"
            fill-opacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>

    <!-- ==================== SECTION 2: E-BOOKS ==================== -->
    <!-- Section menampilkan koleksi e-book panduan -->
    <section class="ebooks-section" id="ebooks">
      <div class="container">
        <!-- Header section -->
        <div class="section-header">
          <div class="section-badge">
            <i class="bi bi-journal-bookmark"></i>
            <span>E-Books</span>
          </div>
          <h2 class="section-title">Buku Saku Digital</h2>
          <p class="section-desc">
            Koleksi buku saku panduan praktis pengelolaan sampah yang dapat
            diunduh gratis
          </p>
        </div>

        <!-- Grid layout untuk e-book cards -->
        <div class="ebooks-grid">
          <!-- E-Book 1: Budidaya Maggot -->
          <div class="ebook-card" data-aos="fade-up" data-aos-delay="0">
            <div class="ebook-cover">
              <!-- Cover gambar untuk e-book -->
              <img
                src="@/assets/images/cover_edu/book_maggot.webp"
                alt="Cover Buku Saku Budidaya Maggot - Panduan budidaya maggot untuk pengolahan sampah organik"
                class="ebook-cover-image"
              />
              <div class="ebook-badge">PDF</div>
            </div>
            <div class="ebook-content">
              <h3>Buku Saku Budidaya Maggot</h3>
              <p>
                Panduan lengkap budidaya maggot untuk pengolahan sampah organik
                yang efektif dan menghasilkan.
              </p>
              <div class="ebook-actions">
                <!-- Tombol view untuk melihat di Google Drive -->
                <a
                  href="https://drive.google.com/file/d/11CxhYbqUXDkz0O0tzOyoIAwMEp-y-7-d/view?usp=drive_link"
                  target="_blank"
                  class="btn-view"
                >
                  <i class="bi bi-eye"></i>
                  Lihat
                </a>
                <!-- Tombol download langsung -->
                <a
                  href="https://drive.google.com/uc?export=download&id=11CxhYbqUXDkz0O0tzOyoIAwMEp-y-7-d"
                  class="btn-download"
                  @click="trackDownload('Buku Saku Budidaya Maggot')"
                >
                  <i class="bi bi-download"></i>
                  Download
                </a>
              </div>
            </div>
          </div>

          <!-- E-Book 2: Ecoenzyme -->
          <div class="ebook-card" data-aos="fade-up" data-aos-delay="100">
            <div class="ebook-cover">
              <img
                src="@/assets/images/cover_edu/book_ecoenzym.webp"
                alt="Cover Buku Saku Ecoenzyme - Cara membuat ecoenzyme dari sampah organik"
                class="ebook-cover-image"
              />
              <div class="ebook-badge">PDF</div>
            </div>
            <div class="ebook-content">
              <h3>Buku Saku Ecoenzyme</h3>
              <p>
                Cara membuat ecoenzyme dari sampah organik untuk pembersih alami
                yang ramah lingkungan.
              </p>
              <div class="ebook-actions">
                <a
                  href="https://drive.google.com/file/d/1Q37BjZ1DV0u9oNt8Kkm0Tp9cmLnylH4T/view?usp=drive_link"
                  target="_blank"
                  class="btn-view"
                >
                  <i class="bi bi-eye"></i>
                  Lihat
                </a>
                <a
                  href="https://drive.google.com/uc?export=download&id=1Q37BjZ1DV0u9oNt8Kkm0Tp9cmLnylH4T"
                  class="btn-download"
                  @click="trackDownload('Buku Saku Ecoenzyme')"
                >
                  <i class="bi bi-download"></i>
                  Download
                </a>
              </div>
            </div>
          </div>

          <!-- E-Book 3: Kompos -->
          <div class="ebook-card" data-aos="fade-up" data-aos-delay="200">
            <div class="ebook-cover">
              <img
                src="@/assets/images/cover_edu/book_kompos.webp"
                alt="Cover Buku Saku Kompos - Teknik pembuatan kompos dari sampah organik"
                class="ebook-cover-image"
              />
              <div class="ebook-badge">PDF</div>
            </div>
            <div class="ebook-content">
              <h3>Buku Saku Kompos</h3>
              <p>
                Teknik pembuatan kompos berkualitas dari sampah organik rumah
                tangga dengan mudah.
              </p>
              <div class="ebook-actions">
                <a
                  href="https://drive.google.com/file/d/1aJ0pJaJbbjWkQm0gb6vM5JW8bx-_GXI0/view?usp=drive_link"
                  target="_blank"
                  class="btn-view"
                >
                  <i class="bi bi-eye"></i>
                  Lihat
                </a>
                <a
                  href="https://drive.google.com/uc?export=download&id=1aJ0pJaJbbjWkQm0gb6vM5JW8bx-_GXI0"
                  class="btn-download"
                  @click="trackDownload('Buku Saku Kompos')"
                >
                  <i class="bi bi-download"></i>
                  Download
                </a>
              </div>
            </div>
          </div>

          <!-- E-Book 4: Pemilahan -->
          <div class="ebook-card" data-aos="fade-up" data-aos-delay="300">
            <div class="ebook-cover">
              <img
                src="@/assets/images/cover_edu/book_pemilahan.webp"
                alt="Cover Buku Saku Pemilahan - Panduan praktis memilah sampah dari sumber"
                class="ebook-cover-image"
              />
              <div class="ebook-badge">PDF</div>
            </div>
            <div class="ebook-content">
              <h3>Buku Saku Pemilahan</h3>
              <p>
                Panduan praktis memilah sampah dari sumber untuk pengelolaan
                yang lebih efektif.
              </p>
              <div class="ebook-actions">
                <a
                  href="https://drive.google.com/file/d/17k03vJBwxTHidAV1Aur-exDBQ0lSZizb/view?usp=drive_link"
                  target="_blank"
                  class="btn-view"
                >
                  <i class="bi bi-eye"></i>
                  Lihat
                </a>
                <a
                  href="https://drive.google.com/uc?export=download&id=17k03vJBwxTHidAV1Aur-exDBQ0lSZizb"
                  class="btn-download"
                  @click="trackDownload('Buku Saku Pemilahan')"
                >
                  <i class="bi bi-download"></i>
                  Download
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== SECTION 3: VIDEO TUTORIALS ==================== -->
    <!-- Section menampilkan video pembelajaran -->
    <section class="videos-section" id="videos">
      <div class="container">
        <!-- Header section -->
        <div class="section-header">
          <div class="section-badge">
            <i class="bi bi-play-circle"></i>
            <span>Video Tutorial</span>
          </div>
          <h2 class="section-title">Video Pembelajaran</h2>
          <p class="section-desc">
            Tonton tutorial praktis pembuatan produk ramah lingkungan dari
            sampah
          </p>
        </div>

        <!-- Grid layout untuk video cards -->
        <div class="videos-grid">
          <!-- Video 1: Sabun dari Minyak Jelantah -->
          <div class="video-card" data-aos="zoom-in" data-aos-delay="0">
            <div class="video-thumbnail">
              <!-- Embed video dari Google Drive -->
              <iframe
                src="https://drive.google.com/file/d/1I2y0rS3pzgInvcz-blfMJFHap0aK7O67/preview"
                allow="autoplay"
                allowfullscreen
                @load="
                  trackVideoView('Cara Pembuatan Sabun Dari Minyak Jelantah')
                "
              ></iframe>
            </div>
            <div class="video-info">
              <h3>Cara Pembuatan Sabun Dari Minyak Jelantah</h3>
              <p>
                Tutorial membuat sabun ramah lingkungan dengan memanfaatkan
                minyak jelantah bekas.
              </p>
              <div class="video-meta">
                <span class="meta-item">
                  <i class="bi bi-play-btn"></i>
                  Video Tutorial
                </span>
              </div>
            </div>
          </div>

          <!-- Video 2: Eco-Brick -->
          <div class="video-card" data-aos="zoom-in" data-aos-delay="100">
            <div class="video-thumbnail">
              <iframe
                src="https://drive.google.com/file/d/15sfM0mQP-E7YLzpUdWfvDxHiV4QkbmYJ/preview"
                allow="autoplay"
                allowfullscreen
                @load="trackVideoView('Cara Pembuatan Eco-Brick')"
              ></iframe>
            </div>
            <div class="video-info">
              <h3>Cara Pembuatan Eco-Brick</h3>
              <p>
                Pelajari cara membuat eco-brick dari botol plastik bekas untuk
                bahan bangunan alternatif.
              </p>
              <div class="video-meta">
                <span class="meta-item">
                  <i class="bi bi-play-btn"></i>
                  Video Tutorial
                </span>
              </div>
            </div>
          </div>

          <!-- Video 3: Produk dari Sampah -->
          <div class="video-card" data-aos="zoom-in" data-aos-delay="200">
            <div class="video-thumbnail">
              <iframe
                src="https://drive.google.com/file/d/1JACJtoE43L8rLoetCab2tEWcd7aPgaUS/preview"
                allow="autoplay"
                allowfullscreen
                @load="
                  trackVideoView(
                    'Produk yang Dihasilkan dari Pemanfaatan Sampah'
                  )
                "
              ></iframe>
            </div>
            <div class="video-info">
              <h3>Produk yang Dihasilkan dari Pemanfaatan Sampah</h3>
              <p>
                Inspirasi produk bernilai ekonomi dari berbagai jenis sampah
                yang dapat didaur ulang.
              </p>
              <div class="video-meta">
                <span class="meta-item">
                  <i class="bi bi-play-btn"></i>
                  Video Tutorial
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- ==================== SECTION 4: CALL TO ACTION ==================== -->
        <!-- Section untuk mengajak user menghubungi tim -->
        <!-- CTA Section -->
        <div class="cta-section">
          <div class="cta-content">
            <div class="cta-icon">
              <i class="bi bi-chat-dots"></i>
            </div>
            <div class="cta-text">
              <h3>Punya Pertanyaan?</h3>
              <p>Tim kami siap membantu Anda dengan senang hati!</p>
            </div>
            <a
              href="https://wa.me/6289693773669?text=Halo%20Kang%20Raling,%20saya%20ingin%20bertanya"
              target="_blank"
              class="btn-cta"
            >
              <i class="bi bi-whatsapp"></i>
              Hubungi Kami
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- KOMPONEN FOOTER -->
     
    <Footer />
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import { onMounted } from "vue";
import { useEducation, useEbooks, useVideos } from "@/scripts/education.js";
import "@/assets/css/education.css";

// Initialize composables
const { handleContact, trackDownload, trackVideoView } = useEducation();
const { ebooks } = useEbooks();
const { videos } = useVideos();

/**
 * MOUNTED HOOK
 * Inisialisasi AOS animations saat komponen dimount
 */
onMounted(() => {
  // Initialize AOS animations if available
  if (window.AOS) {
    window.AOS.init();
  }
});
</script>

<style scoped src="@/assets/css/education.css"></style>
