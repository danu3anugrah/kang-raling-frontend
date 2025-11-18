<!-- 
    KOMPONEN DASHBOARD MAIN PAGE
    Deskripsi: Halaman utama dashboard admin Kang Raling dengan overview statistik
    Tanggal: [15/11/2024]
    Developer: [Danu Tri Anugrah]
    API Endpoints:
      - blogService.getAll()
      - galleryService.getAll() 
      - ecomapService.getAllEcomaps()
-->
<template>
  <div class="dashboard-layout">
    
    <div class="dashboard-content">
      <DashboardHeader />
      
      <div class="main-content">
        <!-- Welcome Banner -->
        <div class="welcome-banner">
          <div class="welcome-text">
            <h1>Selamat Datang, {{ userName }}! 👋</h1>
            <p>Kelola konten Kang Raling dengan mudah melalui dashboard ini</p>
            <div class="welcome-date">
              <i class="bi bi-calendar3"></i>
              <span>{{ currentDate }}</span>
            </div>
          </div>
          <div class="welcome-illustration">
            <img src="@/assets/images/logokangraling.png" alt="Logo Kang Raling" class="welcome-logo">
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="stats-section">
          <h2 class="section-title">
            <i class="bi bi-graph-up"></i>
            Statistik Konten
          </h2>
          <div class="stats-grid">
            <div class="stat-card blog">
              <div class="stat-header">
                <div class="stat-icon">
                  <i class="bi bi-newspaper"></i>
                </div>
                <div class="stat-badge">Blog</div>
              </div>
              <div class="stat-body">
                <h3>{{ totalBlogs }}</h3>
                <p>Total Artikel Blog</p>
              </div>
              <router-link to="/dashboard/blog" class="stat-link">
                Kelola <i class="bi bi-arrow-right"></i>
              </router-link>
            </div>

            <div class="stat-card gallery">
              <div class="stat-header">
                <div class="stat-icon">
                  <i class="bi bi-images"></i>
                </div>
                <div class="stat-badge">Gallery</div>
              </div>
              <div class="stat-body">
                <h3>{{ totalGalleries }}</h3>
                <p>Total Foto Gallery</p>
              </div>
              <router-link to="/dashboard/gallery" class="stat-link">
                Kelola <i class="bi bi-arrow-right"></i>
              </router-link>
            </div>

            <div class="stat-card ecomap">
              <div class="stat-header">
                <div class="stat-icon">
                  <i class="bi bi-geo-alt-fill"></i>
                </div>
                <div class="stat-badge">Ecomap</div>
              </div>
              <div class="stat-body">
                <h3>{{ totalEcomaps }}</h3>
                <p>Total Data Ecomap</p>
              </div>
              <router-link to="/dashboard/ecomap" class="stat-link">
                Kelola <i class="bi bi-arrow-right"></i>
              </router-link>
            </div>
          </div>
        </div>

        <!-- Content Grid -->
        <div class="content-grid">
          <!-- Panduan Section -->
          <div class="guide-section">
            <h2 class="section-title">
              <i class="bi bi-info-circle"></i>
              Panduan Penggunaan
            </h2>
            <div class="guide-card">
              <div class="guide-item">
                <div class="guide-icon">
                  <i class="bi bi-newspaper"></i>
                </div>
                <div class="guide-text">
                  <h4>Kelola Blog</h4>
                  <p>Tambah, edit, dan hapus artikel berita</p>
                </div>
              </div>

              <div class="guide-item">
                <div class="guide-icon">
                  <i class="bi bi-images"></i>
                </div>
                <div class="guide-text">
                  <h4>Kelola Gallery</h4>
                  <p>Upload dan kelola foto dokumentasi</p>
                </div>
              </div>

              <div class="guide-item">
                <div class="guide-icon">
                  <i class="bi bi-geo-alt"></i>
                </div>
                <div class="guide-text">
                  <h4>Kelola Ecomap</h4>
                  <p>Input data timbulan sampah per desa</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Links Section -->
          <div class="quick-links-section">
            <h2 class="section-title">
              <i class="bi bi-lightning-fill"></i>
              Quick Links
            </h2>
            <div class="quick-links-card">
              <router-link to="/dashboard/blog" class="quick-link">
                <div class="link-icon">
                  <i class="bi bi-plus-circle-fill"></i>
                </div>
                <span>Tambah Artikel</span>
                <i class="bi bi-chevron-right"></i>
              </router-link>

              <router-link to="/dashboard/gallery" class="quick-link">
                <div class="link-icon">
                  <i class="bi bi-plus-circle-fill"></i>
                </div>
                <span>Upload Foto</span>
                <i class="bi bi-chevron-right"></i>
              </router-link>

              <router-link to="/dashboard/ecomap" class="quick-link">
                <div class="link-icon">
                  <i class="bi bi-plus-circle-fill"></i>
                </div>
                <span>Input Data Sampah</span>
                <i class="bi bi-chevron-right"></i>
              </router-link>

              <a href="/" target="_blank" class="quick-link external">
                <div class="link-icon">
                  <i class="bi bi-box-arrow-up-right"></i>
                </div>
                <span>Lihat Website</span>
                <i class="bi bi-chevron-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// IMPORT COMPOSABLE FUNCTIONS
import { ref, onMounted } from 'vue'
import { useDashboardData } from '@/scripts/dashboard/dashboardpage.js'

// IMPORT COMPONENTS
import DashboardSidebar from '@/components/Dashboard/DashboardSidebar.vue'
import DashboardHeader from '@/components/Dashboard/DashboardHeader.vue'

// IMPORT CSS
import '@/assets/css/dashboard/dashboardpage.css'

// USE COMPOSABLE
const { 
  userName,
  currentDate,
  totalBlogs,
  totalGalleries, 
  totalEcomaps,
  fetchStats 
} = useDashboardData()

// LIFECYCLE HOOKS
onMounted(() => {
  fetchStats()
})
</script>