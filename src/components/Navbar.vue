<template>
  <nav class="navbar navbar-eco">
    <div class="nav-container">
      <!-- LOGO -->
      <router-link to="/" class="nav-logo">
        <img src="@/assets/images/logo_kangraling.webp" alt="Kang Raling Logo" />
      </router-link>

      <!-- MENU -->
      <ul class="nav-menu" :class="{ active: isMenuOpen }">
        <li>
          <router-link to="/" @click="closeMenu">Beranda</router-link>
        </li>

        <li class="dropdown">
          <a href="#" class="dropdown-toggle" @click.prevent="toggleDropdown('blogGallery')">
            Blog & Gallery
          </a>
          <ul class="dropdown-content" :class="{ show: activeDropdown === 'blogGallery' }">
            <li><router-link to="/blog" @click="closeMenu">Blog</router-link></li>
            <li><router-link to="/gallery" @click="closeMenu">Gallery</router-link></li>
          </ul>
        </li>

        <li class="dropdown">
          <a href="#" class="dropdown-toggle" @click.prevent="toggleDropdown('kangraling')">
            Kang Raling Site
          </a>
          <ul class="dropdown-content" :class="{ show: activeDropdown === 'kangraling' }">
            <li><router-link to="/mekargalih" @click="closeMenu">Desa Mekargalih</router-link></li>
            <li><router-link to="/sukajaya" @click="closeMenu">Desa Sukajaya</router-link></li>
            <li><router-link to="/banjarsari" @click="closeMenu">Desa Banjarsari</router-link></li>
            <li><router-link to="/pakuwon" @click="closeMenu">Desa Pakuwon</router-link></li>
            <li><router-link to="/sanding" @click="closeMenu">Desa Muara Sanding</router-link></li>
            <li><router-link to="/pwa" @click="closeMenu">Peacesantren Welas Asih</router-link></li>
            <li><router-link to="/binangkit" @click="closeMenu">Bank Sampah Binangkit</router-link></li>
          </ul>
        </li>

        <li><router-link to="/education" @click="closeMenu">Education</router-link></li>
        <li><router-link to="/ecomap" @click="closeMenu">EcoMap</router-link></li>
        <li><router-link to="/shop" @click="closeMenu">Shop</router-link></li>
        <li><router-link to="/about" @click="closeMenu">About Us</router-link></li>

        <!-- Login Button (Mobile & Desktop) -->
        <li class="nav-login">
          <router-link to="/login" class="btn-login" @click="closeMenu">
            Masuk
          </router-link>
        </li>
      </ul>

      <!-- HAMBURGER -->
      <div class="hamburger" :class="{ active: isMenuOpen }" @click="toggleMenu">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)
const activeDropdown = ref(null)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  if (!isMenuOpen.value) {
    activeDropdown.value = null
  }
}

const closeMenu = () => {
  isMenuOpen.value = false
  activeDropdown.value = null
}

const toggleDropdown = (dropdownName) => {
  if (activeDropdown.value === dropdownName) {
    activeDropdown.value = null
  } else {
    activeDropdown.value = dropdownName
  }
}
</script>

<style scoped>
@import "@/assets/css/navbar.css";
</style>