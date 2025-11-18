/**
     DASHBOARD ECOMAP MANAGEMENT LOGIC
    Deskripsi: Business logic dan state management untuk komponen DashboardEcomap
    Tanggal: [15/11/2024]
    Developer: [Danu Tri Anugrah]
 */

import { ref, computed } from 'vue'
import ecomapService from '@/services/ecomapService'

// ==================== ECOMAP DATA MANAGEMENT ====================

/**
 * Composable untuk mengelola data ecomap dan desa
 */
export const useEcomapData = () => {
  const desas = ref([])
  const ecomaps = ref([])
  const loadingEcomaps = ref(true)

  /**
   * Fetch semua data desa dari API
   */
  const fetchDesas = async () => {
    try {
      const response = await ecomapService.getAllDesas()
      desas.value = response.data
    } catch (err) {
      console.error('Error fetching desas:', err)
      showNotification('Gagal memuat data desa', 'error')
    }
  }

  /**
   * Fetch semua data ecomap dari API
   */
  const fetchEcomaps = async () => {
    try {
      loadingEcomaps.value = true
      const response = await ecomapService.getAllEcomaps()
      ecomaps.value = response.data
    } catch (err) {
      console.error('Error fetching ecomaps:', err)
      showNotification('Gagal memuat data pencatatan', 'error')
    } finally {
      loadingEcomaps.value = false
    }
  }

  /**
   * Membuat data ecomap baru
   * @param {Object} payload - Data payload untuk ecomap baru
   */
  const createEcomap = async (payload) => {
    const response = await ecomapService.createEcomap(payload)
    return response
  }

  /**
   * Update data ecomap yang sudah ada
   * @param {number} id - ID ecomap
   * @param {Object} payload - Data payload untuk update
   */
  const updateEcomap = async (id, payload) => {
    const response = await ecomapService.updateEcomap(id, payload)
    return response
  }

  /**
   * Hapus data ecomap
   * @param {number} id - ID ecomap yang akan dihapus
   */
  const deleteEcomapData = async (id) => {
    const response = await ecomapService.deleteEcomap(id)
    return response
  }

  return {
    desas,
    ecomaps,
    loadingEcomaps,
    fetchDesas,
    fetchEcomaps,
    createEcomap,
    updateEcomap,
    deleteEcomapData
  }
}

// ==================== DESA MANAGEMENT ====================

/**
 * Composable untuk mengelola operasi desa
 */
export const useDesaManagement = (dependencies) => {
  const { fetchDesas, fetchEcomaps } = dependencies

  const showDesaModal = ref(false)
  const isEditDesa = ref(false)
  const desaForm = ref({
    id: null,
    nama_desa: ''
  })

  /**
   * Buka modal untuk create desa baru
   */
  const openDesaModal = () => {
    isEditDesa.value = false
    desaForm.value = { id: null, nama_desa: '' }
    showDesaModal.value = true
  }

  /**
   * Edit desa yang sudah ada
   * @param {Object} desa - Data desa yang akan diedit
   */
  const editDesa = (desa) => {
    isEditDesa.value = true
    desaForm.value = { id: desa.id, nama_desa: desa.nama_desa }
    showDesaModal.value = true
  }

  /**
   * Tutup modal desa
   */
  const closeDesaModal = () => {
    showDesaModal.value = false
  }

  /**
   * Handle form submission untuk desa
   */
  const submitDesa = async () => {
    try {
      if (isEditDesa.value) {
        await ecomapService.updateDesa(desaForm.value.id, { 
          nama_desa: desaForm.value.nama_desa 
        })
        showNotification('Desa berhasil diupdate!', 'success')
      } else {
        await ecomapService.createDesa({ 
          nama_desa: desaForm.value.nama_desa 
        })
        showNotification('Desa berhasil ditambahkan!', 'success')
      }
      
      closeDesaModal()
      fetchDesas()
    } catch (err) {
      console.error('Error saving desa:', err)
      showNotification('Gagal menyimpan desa', 'error')
    }
  }

  /**
   * Hapus desa dengan konfirmasi
   * @param {number} id - ID desa yang akan dihapus
   */
  const deleteDesa = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus desa ini? Semua data ecomap terkait juga akan terhapus!')) return
    
    try {
      await ecomapService.deleteDesa(id)
      showNotification('Desa berhasil dihapus!', 'success')
      fetchDesas()
      fetchEcomaps()
    } catch (err) {
      console.error('Error deleting desa:', err)
      showNotification('Gagal menghapus desa', 'error')
    }
  }

  return {
    showDesaModal,
    isEditDesa,
    desaForm,
    openDesaModal,
    editDesa,
    closeDesaModal,
    submitDesa,
    deleteDesa
  }
}

// ==================== FORM MANAGEMENT ====================

/**
 * Composable untuk mengelola form ecomap
 */
export const useFormManagement = (dependencies) => {
  const {
    fetchEcomaps,
    createEcomap,
    updateEcomap,
    deleteEcomapData
  } = dependencies

  const form = ref({
    id: null,
    desa_id: '',
    tanggal: new Date().toISOString().split('T')[0],
    jumlah_organik: 0,
    jumlah_anorganik: 0,
    jumlah_residu: 0,
    pengelolaan_organik: '',
    pengelolaan_anorganik: '',
    pengelolaan_residu: ''
  })

  const submitting = ref(false)
  const error = ref(null)
  const customPengelolaanOrganik = ref('')
  const customPengelolaanAnorganik = ref('')
  const customPengelolaanResidu = ref('')

  /**
   * Handle form submission untuk ecomap data
   */
  const submitEcomapData = async () => {
    try {
      submitting.value = true
      error.value = null

      // Prepare payload with custom pengelolaan jika applicable
      const payload = {
        desa_id: form.value.desa_id,
        tanggal: form.value.tanggal,
        jumlah_organik: parseFloat(form.value.jumlah_organik),
        jumlah_anorganik: parseFloat(form.value.jumlah_anorganik),
        jumlah_residu: parseFloat(form.value.jumlah_residu),
        pengelolaan_organik: form.value.pengelolaan_organik === 'lainnya' 
          ? customPengelolaanOrganik.value 
          : form.value.pengelolaan_organik,
        pengelolaan_anorganik: form.value.pengelolaan_anorganik === 'lainnya' 
          ? customPengelolaanAnorganik.value 
          : form.value.pengelolaan_anorganik,
        pengelolaan_residu: form.value.pengelolaan_residu === 'lainnya' 
          ? customPengelolaanResidu.value 
          : form.value.pengelolaan_residu
      }

      if (form.value.id) {
        await updateEcomap(form.value.id, payload)
        showNotification('Data berhasil diupdate!', 'success')
      } else {
        await createEcomap(payload)
        showNotification('Data berhasil disimpan!', 'success')
      }

      resetForm()
      fetchEcomaps()
    } catch (err) {
      error.value = err.response?.data?.message || 'Terjadi kesalahan saat menyimpan data'
      console.error('Error submitting ecomap data:', err)
    } finally {
      submitting.value = false
    }
  }

  /**
   * Reset form ke state awal
   */
  const resetForm = () => {
    form.value = {
      id: null,
      desa_id: '',
      tanggal: new Date().toISOString().split('T')[0],
      jumlah_organik: 0,
      jumlah_anorganik: 0,
      jumlah_residu: 0,
      pengelolaan_organik: '',
      pengelolaan_anorganik: '',
      pengelolaan_residu: ''
    }
    customPengelolaanOrganik.value = ''
    customPengelolaanAnorganik.value = ''
    customPengelolaanResidu.value = ''
    error.value = null
  }

  /**
   * Calculate total (handled by computed property)
   */
  const calculateTotal = () => {
    // Auto-calculated by computed property
  }

  /**
   * Edit data ecomap yang sudah ada
   * @param {Object} ecomap - Data ecomap yang akan diedit
   */
  const editEcomap = (ecomap) => {
    form.value = {
      id: ecomap.id,
      desa_id: ecomap.desa_id,
      tanggal: ecomap.tanggal,
      jumlah_organik: ecomap.jumlah_organik,
      jumlah_anorganik: ecomap.jumlah_anorganik,
      jumlah_residu: ecomap.jumlah_residu,
      pengelolaan_organik: ecomap.pengelolaan_organik,
      pengelolaan_anorganik: ecomap.pengelolaan_anorganik,
      pengelolaan_residu: ecomap.pengelolaan_residu
    }
    
    // Scroll ke form
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /**
   * Hapus data ecomap dengan konfirmasi
   * @param {number} id - ID ecomap yang akan dihapus
   */
  const deleteEcomap = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.')) return
    
    try {
      await deleteEcomapData(id)
      showNotification('Data berhasil dihapus!', 'success')
      fetchEcomaps()
    } catch (err) {
      console.error('Error deleting ecomap:', err)
      showNotification('Gagal menghapus data', 'error')
    }
  }

  return {
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
  }
}

// ==================== ACCORDION MANAGEMENT ====================

/**
 * Composable untuk mengelola accordion behavior
 */
export const useAccordion = () => {
  const activeAccordion = ref(null)

  /**
   * Toggle accordion open/close
   * @param {number} desaId - ID desa untuk toggle
   */
  const toggleAccordion = (desaId) => {
    activeAccordion.value = activeAccordion.value === desaId ? null : desaId
  }

  return {
    activeAccordion,
    toggleAccordion
  }
}

// ==================== CALCULATIONS ====================

/**
 * Composable untuk semua perhitungan data
 */
export const useCalculations = (dependencies) => {
  const { ecomaps, form } = dependencies

  /**
   * Calculate total weight dari semua kategori
   */
  const totalKg = computed(() => {
    return (
      parseFloat(form.value.jumlah_organik || 0) +
      parseFloat(form.value.jumlah_anorganik || 0) +
      parseFloat(form.value.jumlah_residu || 0)
    ).toFixed(1)
  })

  /**
   * Get ecomap data filtered by desa ID
   * @param {number} desaId - ID desa untuk filter
   * @returns {Array} Data ecomap yang difilter
   */
  const getEcomapsByDesa = (desaId) => {
    return ecomaps.value.filter(e => e.desa_id === desaId)
  }

  /**
   * Calculate total per row
   * @param {Object} ecomap - Data ecomap
   * @returns {string} Total yang diformat
   */
  const getTotalPerRow = (ecomap) => {
    return (
      parseFloat(ecomap.jumlah_organik) + 
      parseFloat(ecomap.jumlah_anorganik) + 
      parseFloat(ecomap.jumlah_residu)
    ).toFixed(1)
  }

  /**
   * Calculate subtotal untuk organik per desa
   * @param {number} desaId - ID desa
   * @returns {string} Subtotal yang diformat
   */
  const getSubtotalOrganik = (desaId) => {
    return getEcomapsByDesa(desaId)
      .reduce((sum, e) => sum + parseFloat(e.jumlah_organik), 0)
      .toFixed(1)
  }

  /**
   * Calculate subtotal untuk anorganik per desa
   * @param {number} desaId - ID desa
   * @returns {string} Subtotal yang diformat
   */
  const getSubtotalAnorganik = (desaId) => {
    return getEcomapsByDesa(desaId)
      .reduce((sum, e) => sum + parseFloat(e.jumlah_anorganik), 0)
      .toFixed(1)
  }

  /**
   * Calculate subtotal untuk residu per desa
   * @param {number} desaId - ID desa
   * @returns {string} Subtotal yang diformat
   */
  const getSubtotalResidu = (desaId) => {
    return getEcomapsByDesa(desaId)
      .reduce((sum, e) => sum + parseFloat(e.jumlah_residu), 0)
      .toFixed(1)
  }

  /**
   * Calculate total subtotal per desa
   * @param {number} desaId - ID desa
   * @returns {string} Total subtotal yang diformat
   */
  const getSubtotalTotal = (desaId) => {
    return getEcomapsByDesa(desaId)
      .reduce((sum, e) => {
        return sum + 
          parseFloat(e.jumlah_organik) + 
          parseFloat(e.jumlah_anorganik) + 
          parseFloat(e.jumlah_residu)
      }, 0)
      .toFixed(1)
  }

  return {
    totalKg,
    getEcomapsByDesa,
    getTotalPerRow,
    getSubtotalOrganik,
    getSubtotalAnorganik,
    getSubtotalResidu,
    getSubtotalTotal
  }
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Tampilkan notifikasi
 * @param {string} message - Pesan notifikasi
 * @param {string} type - Tipe notifikasi (success, error, warning)
 */
const showNotification = (message, type = 'success') => {
  // TODO: Integrate with notification library like Toast, Snackbar, etc.
  alert(`[${type.toUpperCase()}] ${message}`)
}

export default {
  useEcomapData,
  useDesaManagement,
  useFormManagement,
  useAccordion,
  useCalculations
}