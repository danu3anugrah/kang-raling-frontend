<!-- 
  KOMPONEN HALAMAN ECOMAP (DATA MONITORING)
  Deskripsi: Halaman untuk visualisasi dan monitoring data timbulan sampah desa binaan
  Tanggal: [15/11/2025]
  Developer: [Danu Tri Anugrah]
-->

<template>
  <div class="shop-page">
    <!-- NAVBAR COMPONENT -->
    <Navbar />

    <!-- HERO SECTION - Bagian utama dengan background dan CTA -->
    <section class="hero-shop">
      <!-- Overlay untuk efek gelap di background -->
      <div class="hero-overlay"></div>
      
      <!-- Konten utama hero section -->
      <div class="hero-content">
        <!-- Badge/logo kecil di atas judul -->
        <div class="hero-badge">
          <i class="bi bi-shop"></i>
          <span>Belanja Sekarang</span>
        </div>
        
        <!-- Judul utama dengan gradient effect -->
        <h1 class="hero-title">
          Kang Raling <span class="gradient-text">Store</span>
        </h1>
        
        <!-- Deskripsi singkat toko -->
        <p class="hero-subtitle">
          Produk ramah lingkungan hasil daur ulang sampah berkualitas tinggi
        </p>

        <!-- QUICK ACTIONS - Tombol aksi cepat -->
        <div class="quick-actions">
          <!-- Tombol ke Shopee -->
          <a
            href="https://id.shp.ee/gvouhqX"
            target="_blank"
            class="action-btn shopee"
          >
            <i class="bi bi-bag-check"></i>
            <span>Shopee Store</span>
          </a>
          
          <!-- Tombol ke WhatsApp -->
          <a
            href="https://wa.me/6289693773669?text=Halo%20Kang%20Raling,%20saya%20ingin%20bertanya%20tentang%20produk"
            target="_blank"
            class="action-btn whatsapp"
          >
            <i class="bi bi-whatsapp"></i>
            <span>Chat WhatsApp</span>
          </a>
        </div>
      </div>

      <!-- WAVE DIVIDER - Gelombang pemisah section -->
      <div class="wave-divider">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="#f8f9fa" fill-opacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>

    <!-- MAIN CONTENT - Konten utama halaman shop -->
    <section class="shop-content">
      <div class="container">
        <!-- STORE INFO - Kartu informasi toko -->
        <div class="store-info">
          <!-- Kartu informasi: Produk Terpercaya -->
          <div class="info-card">
            <div class="info-icon">
              <i class="bi bi-shield-check"></i>
            </div>
            <div class="info-text">
              <h4>Produk Terpercaya</h4>
              <p>100% hasil daur ulang berkualitas</p>
            </div>
          </div>

          <!-- Kartu informasi: Pengiriman Cepat -->
          <div class="info-card">
            <div class="info-icon">
              <i class="bi bi-truck"></i>
            </div>
            <div class="info-text">
              <h4>Pengiriman Cepat</h4>
              <p>Dikirim dari Garut, Jawa Barat</p>
            </div>
          </div>

          <!-- Kartu informasi: Ramah Lingkungan -->
          <div class="info-card">
            <div class="info-icon">
              <i class="bi bi-heart"></i>
            </div>
            <div class="info-text">
              <h4>Ramah Lingkungan</h4>
              <p>Mendukung ekonomi sirkular</p>
            </div>
          </div>
        </div>

        <!-- PRODUCTS SECTION - Section produk -->
        <div class="products-section">
          <h2 class="section-title">
            <i class="bi bi-box-seam"></i>
            Katalog Produk
          </h2>

          <!-- Grid container untuk produk -->
          <div class="products-grid">
            <!-- PRODUCT CARD 1: Ecobrick -->
            <div class="product-card">
              <!-- Badge status produk -->
              <div class="product-badge">Best Seller</div>
              
              <!-- Area gambar produk -->
              <div class="product-image">
                <div class="image-placeholder">
                  <i class="bi bi-bricks"></i>
                </div>
              </div>
              
              <!-- Informasi produk -->
              <div class="product-info">
                <h3 class="product-name">Ecobrick</h3>
                <p class="product-desc">
                  Botol plastik yang diisi padat dengan sampah plastik non-organik untuk dijadikan bahan bangunan ramah lingkungan.
                </p>
                
                <!-- Footer dengan tombol aksi -->
                <div class="product-footer">
                  <div class="product-actions">
                    <!-- Tombol beli di Shopee -->
                    <a
                      href="https://id.shp.ee/H5s9LsG"
                      target="_blank"
                      class="btn-shopee"
                    >
                      <i class="bi bi-cart-plus"></i>
                      Beli di Shopee
                    </a>
                    
                    <!-- Tombol chat WhatsApp -->
                    <a
                      href="https://wa.me/6289693773669?text=Halo%20Kang%20Raling,%20saya%20tertarik%20dengan%20produk%20Ecobrick"
                      target="_blank"
                      class="btn-whatsapp"
                    >
                      <i class="bi bi-whatsapp"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- PRODUCT CARD 2: Gantungan Kunci -->
            <div class="product-card">
              <div class="product-badge popular">Popular</div>
              <div class="product-image">
                <div class="image-placeholder">
                  <i class="bi bi-key"></i>
                </div>
              </div>
              <div class="product-info">
                <h3 class="product-name">Gantungan Kunci</h3>
                <p class="product-desc">
                  Gantungan kunci unik dan kreatif dari bahan daur ulang. Cocok untuk souvenir atau hadiah ramah lingkungan.
                </p>
                <div class="product-footer">
                  <div class="product-actions">
                    <a
                      href="https://id.shp.ee/5At5Myv"
                      target="_blank"
                      class="btn-shopee"
                    >
                      <i class="bi bi-cart-plus"></i>
                      Beli di Shopee
                    </a>
                    <a
                      href="https://wa.me/6289693773669?text=Halo%20Kang%20Raling,%20saya%20tertarik%20dengan%20produk%20Gantungan%20Kunci"
                      target="_blank"
                      class="btn-whatsapp"
                    >
                      <i class="bi bi-whatsapp"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- PRODUCT CARD 3: Kotak Tisu -->
            <div class="product-card">
              <div class="product-badge new">New</div>
              <div class="product-image">
                <div class="image-placeholder">
                  <i class="bi bi-box"></i>
                </div>
              </div>
              <div class="product-info">
                <h3 class="product-name">Kotak Tisu</h3>
                <p class="product-desc">
                  Kotak tisu cantik dan fungsional dari bahan daur ulang. Sempurna untuk mempercantik ruangan Anda.
                </p>
                <div class="product-footer">
                  <div class="product-actions">
                    <a
                      href="https://id.shp.ee/cZfsXK6"
                      target="_blank"
                      class="btn-shopee"
                    >
                      <i class="bi bi-cart-plus"></i>
                      Beli di Shopee
                    </a>
                    <a
                      href="https://wa.me/6289693773669?text=Halo%20Kang%20Raling,%20saya%20tertarik%20dengan%20produk%20Kotak%20Tisu"
                      target="_blank"
                      class="btn-whatsapp"
                    >
                      <i class="bi bi-whatsapp"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- WHY CHOOSE US SECTION - Section alasan memilih -->
        <div class="why-us-section">
          <h2 class="section-title">
            <i class="bi bi-star"></i>
            Mengapa Memilih Kami?
          </h2>

          <!-- Grid fitur unggulan -->
          <div class="features-grid">
            <!-- Fitur 1: Daur Ulang -->
            <div class="feature-card">
              <div class="feature-icon">
                <i class="bi bi-recycle"></i>
              </div>
              <h4>100% Daur Ulang</h4>
              <p>Semua produk dibuat dari bahan daur ulang berkualitas tinggi</p>
            </div>

            <!-- Fitur 2: Pemberdayaan -->
            <div class="feature-card">
              <div class="feature-icon">
                <i class="bi bi-people"></i>
              </div>
              <h4>Pemberdayaan Masyarakat</h4>
              <p>Mendukung ekonomi lokal dan pemberdayaan warga binaan</p>
            </div>

            <!-- Fitur 3: Kualitas -->
            <div class="feature-card">
              <div class="feature-icon">
                <i class="bi bi-hand-thumbs-up"></i>
              </div>
              <h4>Kualitas Terjamin</h4>
              <p>Produk dibuat dengan teliti dan kontrol kualitas yang ketat</p>
            </div>

            <!-- Fitur 4: Lingkungan -->
            <div class="feature-card">
              <div class="feature-icon">
                <i class="bi bi-globe"></i>
              </div>
              <h4>Peduli Lingkungan</h4>
              <p>Setiap pembelian berkontribusi untuk bumi yang lebih bersih</p>
            </div>
          </div>
        </div>

        <!-- CTA SECTION - Call to Action terakhir -->
        <div class="cta-section">
          <div class="cta-content">
            <!-- Icon CTA -->
            <div class="cta-icon">
              <i class="bi bi-chat-dots"></i>
            </div>
            
            <!-- Teks CTA -->
            <div class="cta-text">
              <h3>Punya Pertanyaan?</h3>
              <p>Tim kami siap membantu Anda dengan senang hati!</p>
            </div>
            
            <!-- Tombol CTA -->
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

    <!-- FOOTER COMPONENT -->
    <Footer />
  </div>
</template>

<script setup>
// IMPORT COMPONENTS DAN DEPENDENCIES
import Navbar from "@/components/Navbar.vue";        // Component navbar
import Footer from "@/components/Footer.vue";        // Component footer
import { onMounted } from "vue";                     // Vue lifecycle hook
import { useShopAnalytics } from '@/scripts/shop.js'; // Fungsi analytics toko
import '@/assets/css/shop.css';                      // Stylesheet khusus shop

// INITIALIZE ANALYTICS FUNCTIONS
const { trackShopeeClick, trackWhatsAppClick } = useShopAnalytics();

// LIFECYCLE HOOK - Dijalankan ketika component dimount
onMounted(() => {
  // Inisialisasi fungsi khusus shop (jika ada)
  // Contoh: tracking page view, load data, dll.
});
</script>