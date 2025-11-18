<!-- 
    KOMPONEN DASHBOARD ECOMAP MANAGEMENT
    Deskripsi: Halaman untuk mengelola data monitoring timbulan sampah per desa (Ecomap)
    Tanggal: [15/11/2024]
    Developer: [Danu Tri Anugrah]
    API Endpoints:
      - GET /api/desas - Ambil semua desa
      - POST /api/desas - Buat desa baru
      - PUT /api/desas/{id} - Update desa
      - DELETE /api/desas/{id} - Hapus desa
      - GET /api/ecomaps - Ambil semua data ecomap
      - POST /api/ecomaps - Buat data ecomap baru
      - PUT /api/ecomaps/{id} - Update data ecomap
      - DELETE /api/ecomaps/{id} - Hapus data ecomap
-->
<template>
  <div class="dashboard-layout">
    
    <div class="dashboard-content">
      <DashboardHeader />
      
      <div class="main-content">
        <!-- Header Section -->
        <div class="content-header">
          <div class="header-title">
            <h1>
              <i class="bi bi-geo-alt-fill"></i>
              Kelola Data Ecomap
            </h1>
            <p>Monitoring timbulan sampah per desa binaan</p>
          </div>
          <button class="btn-primary" @click="openDesaModal">
            <i class="bi bi-plus-circle"></i> 
            <span>Tambah Desa</span>
          </button>
        </div>

        <!-- Manajemen Desa Section -->
        <div class="card-section">
          <div class="card-header">
            <div class="card-title">
              <i class="bi bi-geo-alt"></i>
              <h2>Manajemen Desa</h2>
            </div>
          </div>
          <div class="card-body">
            <div class="desa-list">
              <div 
                v-for="desa in desas" 
                :key="desa.id" 
                class="desa-badge"
              >
                <span class="desa-name">{{ desa.nama_desa }}</span>
                <div class="desa-actions">
                  <button 
                    class="btn-edit" 
                    @click="editDesa(desa)"
                    title="Edit Desa"
                  >
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button 
                    class="btn-delete" 
                    @click="deleteDesa(desa.id)"
                    title="Hapus Desa"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>
              
              <div v-if="desas.length === 0" class="empty-desa">
                <i class="bi bi-geo-alt"></i>
                <p>Belum ada desa terdaftar</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Input Data Section -->
        <div class="card-section">
          <div class="card-header">
            <div class="card-title">
              <i class="bi bi-clipboard-data"></i>
              <h2>Form Input Data - Komposisi & Pengelolaan</h2>
            </div>
          </div>
          <div class="card-body">
            <form @submit.prevent="submitEcomapData" class="ecomap-form">
              <div class="form-grid">
                <!-- Desa Selection -->
                <div class="form-group">
                  <label class="form-label">Desa / TPS</label>
                  <select class="form-select" v-model="form.desa_id" required>
                    <option value="">Pilih Desa</option>
                    <option v-for="desa in desas" :key="desa.id" :value="desa.id">
                      {{ desa.nama_desa }}
                    </option>
                  </select>
                </div>

                <!-- Date Input -->
                <div class="form-group">
                  <label class="form-label">Tanggal</label>
                  <input 
                    type="date" 
                    class="form-input" 
                    v-model="form.tanggal" 
                    required
                  >
                </div>

                <!-- Organik Section -->
                <div class="form-group full-width">
                  <label class="form-label">Organik</label>
                  <div class="input-group">
                    <input 
                      type="number" 
                      step="0.01" 
                      class="form-input" 
                      v-model.number="form.jumlah_organik"
                      @input="calculateTotal"
                      placeholder="0.00"
                      required
                    >
                    <span class="input-unit">kg</span>
                  </div>
                  <select class="form-select mt-2" v-model="form.pengelolaan_organik" required>
                    <option value="">-- Pilih Pengelolaan --</option>
                    <option value="Dikompos / Pakan">Dikompos / Pakan</option>
                    <option value="Dijual ke pengepul">Dijual ke pengepul</option>
                    <option value="Dibuang">Dibuang</option>
                    <option value="lainnya">Lainnya...</option>
                  </select>
                  <input 
                    v-if="form.pengelolaan_organik === 'lainnya'" 
                    type="text" 
                    class="form-input mt-2" 
                    v-model="customPengelolaanOrganik"
                    placeholder="Ketik pengelolaan lainnya"
                    required
                  >
                </div>

                <!-- Anorganik Section -->
                <div class="form-group full-width">
                  <label class="form-label">Anorganik</label>
                  <div class="input-group">
                    <input 
                      type="number" 
                      step="0.01" 
                      class="form-input" 
                      v-model.number="form.jumlah_anorganik"
                      @input="calculateTotal"
                      placeholder="0.00"
                      required
                    >
                    <span class="input-unit">kg</span>
                  </div>
                  <select class="form-select mt-2" v-model="form.pengelolaan_anorganik" required>
                    <option value="">-- Pilih Pengelolaan --</option>
                    <option value="Dijual ke pengepul">Dijual ke pengepul</option>
                    <option value="Dibuang">Dibuang</option>
                    <option value="lainnya">Lainnya...</option>
                  </select>
                  <input 
                    v-if="form.pengelolaan_anorganik === 'lainnya'" 
                    type="text" 
                    class="form-input mt-2" 
                    v-model="customPengelolaanAnorganik"
                    placeholder="Ketik pengelolaan lainnya"
                    required
                  >
                </div>

                <!-- Residu Section -->
                <div class="form-group full-width">
                  <label class="form-label">Residu</label>
                  <div class="input-group">
                    <input 
                      type="number" 
                      step="0.01" 
                      class="form-input" 
                      v-model.number="form.jumlah_residu"
                      @input="calculateTotal"
                      placeholder="0.00"
                      required
                    >
                    <span class="input-unit">kg</span>
                  </div>
                  <select class="form-select mt-2" v-model="form.pengelolaan_residu" required>
                    <option value="">-- Pilih Pengelolaan --</option>
                    <option value="Diangkut Ke TPS">Diangkut Ke TPS</option>
                    <option value="Dibakar di tungku">Dibakar di tungku</option>
                    <option value="lainnya">Lainnya...</option>
                  </select>
                  <input 
                    v-if="form.pengelolaan_residu === 'lainnya'" 
                    type="text" 
                    class="form-input mt-2" 
                    v-model="customPengelolaanResidu"
                    placeholder="Ketik pengelolaan lainnya"
                    required
                  >
                </div>

                <!-- Total Display -->
                <div class="form-group full-width">
                  <label class="form-label">Total</label>
                  <div class="total-display">
                    <span class="total-value">{{ totalKg }} kg</span>
                    <span class="total-label">Total keseluruhan</span>
                  </div>
                </div>
              </div>

              <!-- Error Message -->
              <div v-if="error" class="error-message">
                <i class="bi bi-exclamation-triangle"></i>
                {{ error }}
              </div>

              <!-- Form Actions -->
              <div class="form-actions">
                <button 
                  type="button" 
                  class="btn-secondary" 
                  @click="resetForm"
                  :disabled="submitting"
                >
                  <i class="bi bi-arrow-clockwise"></i>
                  Reset Form
                </button>
                <button 
                  type="submit" 
                  class="btn-primary" 
                  :disabled="submitting"
                >
                  <span v-if="submitting" class="loading-text">
                    <i class="bi bi-arrow-repeat"></i>
                    Menyimpan...
                  </span>
                  <span v-else>
                    <i class="bi bi-save"></i>
                    {{ form.id ? 'Update Data' : 'Simpan Pencatatan' }}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Data Pencatatan Section -->
        <div class="card-section">
          <div class="card-header">
            <div class="card-title">
              <i class="bi bi-table"></i>
              <h2>Data Pencatatan Per Desa</h2>
            </div>
          </div>
          <div class="card-body">
            <!-- Loading State -->
            <div v-if="loadingEcomaps" class="loading-state">
              <div class="spinner"></div>
              <p>Memuat data pencatatan...</p>
            </div>

            <!-- Empty State -->
            <div v-else-if="ecomaps.length === 0" class="empty-state">
              <div class="empty-icon">
                <i class="bi bi-clipboard-data"></i>
              </div>
              <h3>Belum ada data pencatatan</h3>
              <p>Mulai dengan menginput data pertama Anda</p>
            </div>

            <!-- Data Accordion -->
            <div v-else class="accordion-container">
              <div 
                v-for="(desa, index) in desas" 
                :key="desa.id" 
                class="accordion-item"
              >
                <button 
                  class="accordion-header"
                  :class="{ active: activeAccordion === desa.id }"
                  @click="toggleAccordion(desa.id)"
                >
                  <div class="accordion-title">
                    <strong>{{ desa.nama_desa }}</strong>
                    <span class="data-count">
                      {{ getEcomapsByDesa(desa.id).length }} entri
                    </span>
                  </div>
                  <i 
                    class="bi accordion-icon"
                    :class="activeAccordion === desa.id ? 'bi-chevron-up' : 'bi-chevron-down'"
                  ></i>
                </button>
                
                <div 
                  class="accordion-content"
                  :class="{ active: activeAccordion === desa.id }"
                >
                  <div v-if="getEcomapsByDesa(desa.id).length === 0" class="empty-accordion">
                    <i class="bi bi-inbox"></i>
                    <p>Belum ada data pencatatan untuk desa ini</p>
                  </div>
                  
                  <div v-else class="table-container">
                    <div class="table-responsive">
                      <table class="data-table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Tanggal</th>
                            <th>Organik</th>
                            <th>Pengelolaan</th>
                            <th>Anorganik</th>
                            <th>Pengelolaan</th>
                            <th>Residu</th>
                            <th>Pengelolaan</th>
                            <th>Total</th>
                            <th>Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(ecomap, idx) in getEcomapsByDesa(desa.id)" :key="ecomap.id">
                            <td class="text-center">{{ idx + 1 }}</td>
                            <td>{{ formatDate(ecomap.tanggal) }}</td>
                            <td class="text-end">{{ ecomap.jumlah_organik }} kg</td>
                            <td>{{ ecomap.pengelolaan_organik }}</td>
                            <td class="text-end">{{ ecomap.jumlah_anorganik }} kg</td>
                            <td>{{ ecomap.pengelolaan_anorganik }}</td>
                            <td class="text-end">{{ ecomap.jumlah_residu }} kg</td>
                            <td>{{ ecomap.pengelolaan_residu }}</td>
                            <td class="text-end total-cell">
                              <strong>{{ getTotalPerRow(ecomap) }} kg</strong>
                            </td>
                            <td class="actions-cell">
                              <div class="action-buttons">
                                <button 
                                  class="btn-edit" 
                                  @click="editEcomap(ecomap)"
                                  title="Edit Data"
                                >
                                  <i class="bi bi-pencil"></i>
                                </button>
                                <button 
                                  class="btn-delete" 
                                  @click="deleteEcomap(ecomap.id)"
                                  title="Hapus Data"
                                >
                                  <i class="bi bi-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr class="table-footer">
                            <td colspan="2" class="text-start">
                              <strong>Subtotal {{ desa.nama_desa }}</strong>
                            </td>
                            <td class="text-end">
                              <strong>{{ getSubtotalOrganik(desa.id) }} kg</strong>
                            </td>
                            <td>-</td>
                            <td class="text-end">
                              <strong>{{ getSubtotalAnorganik(desa.id) }} kg</strong>
                            </td>
                            <td>-</td>
                            <td class="text-end">
                              <strong>{{ getSubtotalResidu(desa.id) }} kg</strong>
                            </td>
                            <td>-</td>
                            <td class="text-end total-cell">
                              <strong>{{ getSubtotalTotal(desa.id) }} kg</strong>
                            </td>
                            <td>-</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Desa Modal -->
    <div v-if="showDesaModal" class="modal-overlay" @click.self="closeDesaModal">
      <div class="modal-container">
        <div class="modal-header">
          <h2>{{ isEditDesa ? 'Edit Desa' : 'Tambah Desa Baru' }}</h2>
          <button class="btn-close" @click="closeDesaModal" title="Tutup">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <form @submit.prevent="submitDesa" class="desa-form">
            <div class="form-group">
              <label class="form-label">Nama Desa</label>
              <input 
                type="text" 
                class="form-input" 
                v-model="desaForm.nama_desa"
                placeholder="Contoh: Desa Sukamaju"
                required
                maxlength="100"
              />
              <div class="char-counter">{{ desaForm.nama_desa.length }}/100</div>
            </div>

            <div class="form-actions">
              <button 
                type="button" 
                class="btn-secondary" 
                @click="closeDesaModal"
              >
                Batal
              </button>
              <button type="submit" class="btn-primary">
                {{ isEditDesa ? 'Update Desa' : 'Simpan Desa' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * DASHBOARD ECOMAP VUE COMPONENT
 * File: DashboardEcomap.vue
 * Deskripsi: Komponen utama untuk manajemen data ecomap dan desa
 */

import { ref, onMounted, computed } from 'vue'
import DashboardHeader from '@/components/Dashboard/DashboardHeader.vue'
import { 
  useEcomapData,
  useDesaManagement,
  useFormManagement,
  useAccordion,
  useCalculations
} from '@/scripts/dashboard/dashboardecomap.js'

export default {
  name: 'DashboardEcomap',
  components: {
    DashboardHeader
  },
  setup() {
    // Import composables dari file JavaScript terpisah
    const {
      desas,
      ecomaps,
      loadingEcomaps,
      fetchDesas,
      fetchEcomaps,
      createEcomap,
      updateEcomap,
      deleteEcomapData
    } = useEcomapData()

    const {
      showDesaModal,
      isEditDesa,
      desaForm,
      openDesaModal,
      editDesa,
      closeDesaModal,
      submitDesa,
      deleteDesa
    } = useDesaManagement({ fetchDesas, fetchEcomaps })

    const {
      form,
      submitting,
      error,
      customPengelolaanOrganik,
      customPengelolaanAnorganik,
      customPengelolaanResidu,
      submitEcomapData,
      resetForm,
      editEcomap,
      deleteEcomap,
      calculateTotal
    } = useFormManagement({
      desas,
      ecomaps,
      fetchEcomaps,
      createEcomap,
      updateEcomap,
      deleteEcomapData
    })

    const {
      activeAccordion,
      toggleAccordion
    } = useAccordion()

    const {
      totalKg,
      getEcomapsByDesa,
      getTotalPerRow,
      getSubtotalOrganik,
      getSubtotalAnorganik,
      getSubtotalResidu,
      getSubtotalTotal
    } = useCalculations({ desas, ecomaps, form })

    // Utility functions
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    }

    const showNotification = (message, type = 'success') => {
      alert(message)
    }

    // Lifecycle hook
    onMounted(() => {
      fetchDesas()
      fetchEcomaps()
    })

    return {
      // State
      desas,
      ecomaps,
      loadingEcomaps,
      showDesaModal,
      isEditDesa,
      desaForm,
      form,
      submitting,
      error,
      activeAccordion,
      customPengelolaanOrganik,
      customPengelolaanAnorganik,
      customPengelolaanResidu,
      totalKg,
      
      // Methods
      fetchDesas,
      fetchEcomaps,
      openDesaModal,
      editDesa,
      closeDesaModal,
      submitDesa,
      deleteDesa,
      submitEcomapData,
      resetForm,
      editEcomap,
      deleteEcomap,
      calculateTotal,
      toggleAccordion,
      getEcomapsByDesa,
      getTotalPerRow,
      getSubtotalOrganik,
      getSubtotalAnorganik,
      getSubtotalResidu,
      getSubtotalTotal,
      formatDate,
      showNotification
    }
  }
}
</script>

<style scoped>
/* CSS akan diimport dari file external */
@import '@/assets/css/dashboard/dashboardecomap.css';
</style>