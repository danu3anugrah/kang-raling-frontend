<!-- 
  KOMPONEN HALAMAN ECOMAP (DATA MONITORING)
  Deskripsi: Halaman untuk visualisasi dan monitoring data timbulan sampah desa binaan
  Tanggal: [15/11/2025]
  Developer: [Danu Tri Anugrah]
-->

<template>
  <div class="ecomap-page">
    <Navbar />
    
    <!-- ==================== SECTION 1: HERO ECOMAP ==================== -->
    <section class="hero-ecomap">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <div class="hero-badge">
          <i class="bi bi-map"></i>
          <span>Data Monitoring</span>
        </div>
        <h1 class="hero-title">
          EcoMap <span class="gradient-text">Kang Raling</span>
        </h1>
        <p class="hero-subtitle">
          Visualisasi data timbulan sampah di desa-desa binaan secara real-time
        </p>
      </div>

      <!-- Wave Divider -->
      <div class="wave-divider">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="#f8f9fa" fill-opacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>

    <!-- ==================== SECTION 2: MAIN CONTENT ==================== -->
    <section class="ecomap-content">
      <div class="container">
        
        <!-- ========== FILTER SECTION ========== -->
        <div class="filter-section">
          <h2 class="section-title">
            <i class="bi bi-funnel"></i>
            Filter Data
          </h2>
          <div class="filter-grid">
            <div class="filter-item">
              <label class="filter-label">
                <i class="bi bi-geo-alt"></i>
                Pilih Desa
              </label>
              <select class="filter-select" v-model="filters.desa">
                <option value="">Semua Desa</option>
                <option v-for="desa in desas" :key="desa.id" :value="desa.id">
                  {{ desa.nama_desa }}
                </option>
              </select>
            </div>

            <div class="filter-item">
              <label class="filter-label">
                <i class="bi bi-calendar-month"></i>
                Pilih Bulan
              </label>
              <select class="filter-select" v-model="filters.bulan">
                <option value="">Semua Bulan</option>
                <option value="1">Januari</option>
                <option value="2">Februari</option>
                <option value="3">Maret</option>
                <option value="4">April</option>
                <option value="5">Mei</option>
                <option value="6">Juni</option>
                <option value="7">Juli</option>
                <option value="8">Agustus</option>
                <option value="9">September</option>
                <option value="10">Oktober</option>
                <option value="11">November</option>
                <option value="12">Desember</option>
              </select>
            </div>

            <div class="filter-item">
              <label class="filter-label">
                <i class="bi bi-calendar4"></i>
                Pilih Tahun
              </label>
              <select class="filter-select" v-model="filters.tahun">
                <option value="">Semua Tahun</option>
                <option v-for="year in availableYears" :key="year" :value="year">
                  {{ year }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- ========== STATISTIK SECTION ========== -->
        <div class="stats-section">
          <h2 class="section-title">
            <i class="bi bi-graph-up-arrow"></i>
            Ringkasan Data
          </h2>
          <div class="stats-grid">
            <div class="stat-card organik">
              <div class="stat-icon">
                <i class="bi bi-leaf-fill"></i>
              </div>
              <div class="stat-content">
                <p class="stat-label">Organik</p>
                <h3 class="stat-value">{{ filteredStats.totalOrganik }}</h3>
                <span class="stat-unit">Kilogram</span>
              </div>
            </div>

            <div class="stat-card anorganik">
              <div class="stat-icon">
                <i class="bi bi-recycle"></i>
              </div>
              <div class="stat-content">
                <p class="stat-label">Anorganik</p>
                <h3 class="stat-value">{{ filteredStats.totalAnorganik }}</h3>
                <span class="stat-unit">Kilogram</span>
              </div>
            </div>

            <div class="stat-card residu">
              <div class="stat-icon">
                <i class="bi bi-trash3-fill"></i>
              </div>
              <div class="stat-content">
                <p class="stat-label">Residu</p>
                <h3 class="stat-value">{{ filteredStats.totalResidu }}</h3>
                <span class="stat-unit">Kilogram</span>
              </div>
            </div>

            <div class="stat-card total">
              <div class="stat-icon">
                <i class="bi bi-bar-chart-fill"></i>
              </div>
              <div class="stat-content">
                <p class="stat-label">Total Keseluruhan</p>
                <h3 class="stat-value">{{ filteredStats.grandTotal }}</h3>
                <span class="stat-unit">Kilogram</span>
              </div>
            </div>
          </div>
        </div>

        <!-- ========== CHART SECTION ========== -->
        <div class="chart-section">
          <h2 class="section-title">
            <i class="bi bi-pie-chart"></i>
            Visualisasi Data
          </h2>
          <div class="chart-grid">
            <div class="chart-card">
              <h3 class="chart-title">Timbulan Sampah per Desa</h3>
              <div class="chart-wrapper">
                <canvas ref="barChart"></canvas>
              </div>
            </div>

            <div class="chart-card">
              <h3 class="chart-title">Komposisi Total Sampah</h3>
              <div class="chart-wrapper">
                <canvas ref="pieChart"></canvas>
              </div>
            </div>
          </div>
        </div>

        <!-- ========== DATA TABLES SECTION ========== -->
        <div class="tables-section">
          <h2 class="section-title">
            <i class="bi bi-table"></i>
            Data Pencatatan Per Desa
          </h2>

          <!-- Loading State -->
          <div v-if="loading" class="loading-state">
            <div class="spinner"></div>
            <p>Memuat data...</p>
          </div>

          <!-- Data Accordion -->
          <div v-else class="data-accordion">
            <div
              v-for="(desa, index) in filteredDesas"
              :key="desa.id"
              class="accordion-item"
            >
              <button
                class="accordion-header"
                :class="{ active: activeAccordion === index }"
                @click="toggleAccordion(index)"
              >
                <div class="header-left">
                  <i class="bi bi-geo-alt-fill"></i>
                  <span class="desa-name">{{ desa.nama_desa }}</span>
                </div>
                <div class="header-right">
                  <span class="entry-badge">
                    {{ getEcomapsByDesa(desa.id).length }} entri
                  </span>
                  <i
                    class="bi"
                    :class="activeAccordion === index ? 'bi-chevron-up' : 'bi-chevron-down'"
                  ></i>
                </div>
              </button>

              <div
                class="accordion-content"
                :class="{ active: activeAccordion === index }"
              >
                <div v-if="getEcomapsByDesa(desa.id).length === 0" class="empty-data">
                  <i class="bi bi-inbox"></i>
                  <p>Belum ada data pencatatan untuk desa ini</p>
                </div>

                <div v-else class="table-wrapper">
                  <table class="data-table">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Tanggal</th>
                        <th>Organik (kg)</th>
                        <th>Anorganik (kg)</th>
                        <th>Residu (kg)</th>
                        <th>Total (kg)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(ecomap, idx) in getEcomapsByDesa(desa.id)" :key="ecomap.id">
                        <td>{{ idx + 1 }}</td>
                        <td>{{ formatDate(ecomap.tanggal) }}</td>
                        <td class="organik-cell">{{ ecomap.jumlah_organik }}</td>
                        <td class="anorganik-cell">{{ ecomap.jumlah_anorganik }}</td>
                        <td class="residu-cell">{{ ecomap.jumlah_residu }}</td>
                        <td class="total-cell"><strong>{{ getTotalPerRow(ecomap) }}</strong></td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr class="subtotal-row">
                        <td colspan="2"><strong>Subtotal</strong></td>
                        <td class="organik-cell"><strong>{{ getSubtotalOrganik(desa.id) }}</strong></td>
                        <td class="anorganik-cell"><strong>{{ getSubtotalAnorganik(desa.id) }}</strong></td>
                        <td class="residu-cell"><strong>{{ getSubtotalResidu(desa.id) }}</strong></td>
                        <td class="total-cell"><strong>{{ getSubtotalTotal(desa.id) }}</strong></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
         <!-- ========== EXPORT SECTION ========== -->
        <div class="export-section">
          <h2 class="section-title">
            <i class="bi bi-download"></i>
            Ekspor Data
          </h2>
          <div class="export-buttons">
            <button class="btn-export pdf" @click="exportToPDF" :disabled="exportLoading">
              <i class="bi bi-file-pdf"></i>
              {{ exportLoading ? 'Memproses...' : 'Export PDF' }}
            </button>
            <button class="btn-export excel" @click="exportToExcel" :disabled="exportLoading">
              <i class="bi bi-file-spreadsheet"></i>
              {{ exportLoading ? 'Memproses...' : 'Export Excel' }}
            </button>
            <button class="btn-export print" @click="printReport">
              <i class="bi bi-printer"></i>
              Print
            </button>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import ecomapService from '@/services/ecomapService'
import Chart from 'chart.js/auto'
import { 
  useEcomapData, 
  useEcomapFilters, 
  useEcomapCharts, 
  useEcomapTables,
  useEcomapUtils,
  useEcomapExport
} from '@/scripts/ecomap.js'
import '@/assets/css/ecomap.css'

// ==================== REACTIVE STATE ====================
const desas = ref([])
const ecomaps = ref([])
const loading = ref(true)
const exportLoading = ref(false)
const activeAccordion = ref(0)

const filters = ref({
  desa: '',
  bulan: '',
  tahun: ''
})

const barChart = ref(null)
const pieChart = ref(null)

// ==================== COMPOSABLE FUNCTIONS ====================
const { fetchData } = useEcomapData(desas, ecomaps, loading)
const { 
  filteredEcomaps, 
  filteredDesas, 
  availableYears, 
  filteredStats 
} = useEcomapFilters(desas, ecomaps, filters)
const { 
  createBarChart, 
  createPieChart, 
  updateCharts
} = useEcomapCharts(barChart, pieChart, filteredDesas, filteredStats, filters, filteredEcomaps)
const { 
  toggleAccordion, 
  getEcomapsByDesa, 
  getTotalPerRow, 
  getSubtotalOrganik, 
  getSubtotalAnorganik, 
  getSubtotalResidu, 
  getSubtotalTotal 
} = useEcomapTables(activeAccordion, filteredEcomaps)
const { formatDate } = useEcomapUtils()
const { 
  exportToPDF, 
  exportToExcel, 
  printReport 
} = useEcomapExport(filteredDesas, filteredStats, filteredEcomaps, filters, exportLoading, getEcomapsByDesa, getTotalPerRow, getSubtotalOrganik, getSubtotalAnorganik, getSubtotalResidu, getSubtotalTotal)

// ==================== WATCHERS ====================
watch([filters, filteredEcomaps], () => {
  updateCharts()
}, { deep: true })

// ==================== LIFECYCLE HOOKS ====================
onMounted(async () => {
  await fetchData(ecomapService)
  await nextTick()
  updateCharts()
})
</script>