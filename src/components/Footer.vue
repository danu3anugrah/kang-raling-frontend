<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-col footer-about">
        <img
          src="@/assets/images/logo_kangraling.webp"
          alt="Kang Raling Logo"
          class="footer-logo"
        />
        <p>Kantor Dinas Lingkungan Hidup Kabupaten Garut</p>
        <p>
          Jl. Terusan Pahlawan, Sukagalih, Kec. Tarogong Kidul, Kabupaten Garut,
          Jawa Barat 44151
        </p>
      </div>
      <div class="footer-col footer-menu">
        <h4>Menu</h4>
        <ul>
          <li><a href="#landing">Beranda</a></li>
          <li><a href="#blog">Blog & Gallery</a></li>
          <li><a href="#site">Kang Raling Site</a></li>
          <li><a href="#edu">Education</a></li>
          <li><a href="#map">EcoMap</a></li>
          <li><a href="#shop">Shop</a></li>
          <li><a href="#about">About Us</a></li>
        </ul>
      </div>
      <div class="footer-col footer-info">
        <h4>Info Lainnya</h4>
        <ul>
          <li>
            <a href="https://dlhkabgarut.org/" target="_blank">Regulasi</a>
          </li>
          <li>
            <a href="https://www.garutkab.go.id/" target="_blank"
              >Pemerintah Kabupaten Garut</a
            >
          </li>
          <li><a href="#contact">Kontak Kami</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
      </div>
      <div class="footer-col footer-social">
        <h4>Ikuti Kami</h4>
        <div class="social-links">
          <a href="https://facebook.com/kangraling" target="_blank">Facebook</a>
          <a href="https://youtube.com/@kangraling" target="_blank">Youtube</a>
          <a href="https://instagram.com/kangraling" target="_blank"
            >Instagram</a
          >
          <a href="https://tiktok.com/@kangraling" target="_blank">Tiktok</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2025 Kang Raling — Kampung Ramah Lingkungan</p>
    </div>
  </footer>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  // Tambahkan skrip jika perlu
});
</script>

<style scoped>
@import "@/assets/css/footer.css";
</style>
