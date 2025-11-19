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
      icon: "bi-house-check",
    },
    {
      value: "1000+",
      label: "Warga Terlayani",
      description: "Jumlah warga yang merasakan manfaat program",
      icon: "bi-people",
    },
    {
      value: "1000 Ton+",
      label: "Sampah Dikelola",
      description: "Total sampah yang berhasil dikelola secara proper",
      icon: "bi-recycle",
    },
  ],

  TIMELINE: [
    {
      year: "2021",
      title: "Awal Perjalanan",
      description:
        "Kang Raling memulai perjalanan dengan proses belajar dan pengembangan konsep pengelolaan sampah berbasis komunitas di tingkat desa.",
      icon: "bi-flag",
    },
    {
      year: "2022",
      title: "Kang Raling Berkembang",
      description:
        "Program mulai menunjukkan perkembangan signifikan dengan peningkatan partisipasi warga dan sistem pengelolaan sampah yang lebih terstruktur.",
      icon: "bi-arrow-expand",
    },
    {
      year: "2023",
      title: "Desa Binaan Pertama Sukses",
      description:
        "Beberapa desa binaan awal berhasil menunjukkan kemajuan luar biasa dalam 1 tahun, menjadi bukti konsep yang efektif dan inspirasi bagi desa lainnya.",
      icon: "bi-trophy",
    },
    {
      year: "2024",
      title: "Ekspansi Program",
      description:
        "Memperluas jangkauan ke desa-desa baru yang memiliki TPS3R, dengan desa binaan awal menjadi model percontohan dan mentor bagi desa baru.",
      icon: "bi-geo-expand",
    },
    {
      year: "2025",
      title: "Era Digital Kang Raling",
      description:
        "Transformasi menuju solusi digital lengkap dengan sistem monitoring terintegrasi, platform edukasi online, dan toko digital untuk produk daur ulang.",
      icon: "bi-laptop",
    },
  ],
};

// Utility functions
export function useAboutUtils() {
  /**
   * Format number dengan separator
   * @param {number} num - Angka yang akan diformat
   * @returns {string} String yang sudah diformat
   */
  const formatNumber = (num) => {
    return new Intl.NumberFormat("id-ID").format(num);
  };

  /**
   * Calculate grid class berdasarkan jumlah item
   * @param {number} count - Jumlah item
   * @returns {string} CSS class name
   */
  const getGridClass = (count) => {
    return count % 2 !== 0 ? "grid-centered" : "grid-normal";
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
    handleImageError,
  };
}
