/**
    MODULE ABOUT PAGE UTILITIES
    Deskripsi: Utility functions untuk halaman About
    Tanggal: [15/11/2025]
    Developer: [Danu Tri Anugrah]
 */

// Constants untuk data yang bisa dipakai di multiple places
export const ABOUT_CONSTANTS = {
  STATS: [
    {
      value: "5+",
      label: "Desa Binaan",
      description: "Desa yang telah menjadi binaan program Kang Raling",
      icon: "bi-house-check"
    },
    {
      value: "500+",
      label: "Warga Terlayani",
      description: "Jumlah warga yang merasakan manfaat program",
      icon: "bi-people"
    },
    {
      value: "10 Ton+",
      label: "Sampah Dikelola",
      description: "Total sampah yang berhasil dikelola secara proper",
      icon: "bi-recycle"
    }
  ],
  
  TIMELINE: [
    {
      year: "2020",
      title: "Awal Berdiri",
      description: "Program Kang Raling resmi diluncurkan dengan fokus pada 2 desa percontohan di Kabupaten Garut.",
      icon: "bi-flag"
    },
    {
      year: "2021",
      title: "Ekspansi Program",
      description: "Perluasan ke 5 desa binaan dengan pembangunan TPS3R dan pelatihan intensif untuk warga.",
      icon: "bi-arrow-expand"
    },
    {
      year: "2022",
      title: "Inovasi Digital",
      description: "Peluncuran website dan sistem pencatatan digital untuk monitoring data sampah real-time.",
      icon: "bi-laptop"
    },
    {
      year: "2023",
      title: "Pengembangan Produk",
      description: "Membuka Kang Raling Store dengan produk-produk hasil daur ulang berkualitas tinggi.",
      icon: "bi-shop"
    },
    {
      year: "2024-2025",
      title: "Masa Kini",
      description: "Terus berkembang dengan lebih banyak desa binaan, program edukasi, dan dampak positif untuk lingkungan.",
      icon: "bi-graph-up"
    }
  ]
};

// Utility functions
export function useAboutUtils() {
  /**
   * Format number dengan separator
   * @param {number} num - Angka yang akan diformat
   * @returns {string} String yang sudah diformat
   */
  const formatNumber = (num) => {
    return new Intl.NumberFormat('id-ID').format(num);
  };

  /**
   * Calculate grid class berdasarkan jumlah item
   * @param {number} count - Jumlah item
   * @returns {string} CSS class name
   */
  const getGridClass = (count) => {
    return count % 2 !== 0 ? 'grid-centered' : 'grid-normal';
  };

  /**
   * Handle image error dengan fallback
   * @param {Ref} errorRef - Vue ref untuk error state
   * @param {number} index - Optional index untuk array errors
   */
  const handleImageError = (errorRef, index = null) => {
    if (index !== null && Array.isArray(errorRef.value)) {
      errorRef.value[index] = true;
    } else {
      errorRef.value = true;
    }
  };

  return {
    formatNumber,
    getGridClass,
    handleImageError
  };
}