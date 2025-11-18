/* 
    DATA MODULE - TPS 3R PAKUWON
    Deskripsi: Data constants dan utility functions untuk TPS 3R
    Tanggal: [15/11/2024]
    Developer: [Danu Tri Anugrah]
*/

// ================================
// SECTION: DATA CONSTANTS
// ================================

/**
 * OBJECT: tps3rData
 * DESKRIPSI: Menyimpan semua data statis untuk TPS 3R
 * STRUKTUR: Object dengan properti terorganisir
 */
export const tps3rData = {
  // Informasi dasar TPS 3R
  name: "TPS 3R RAPEKAN",
  location:
    "Desa Pakuwon, Kec. Cisurupan, Kabupaten Garut, Jawa Barat 44163",
  manager: "KPP TPS 3R Rapekan",
  responsiblePerson: "Deni Susanto",
  familiesServed: "130",

  // Data fasilitator
  facilitator: {
    name: "Rifki Akbar, S.Kom",
    position: "Fasilitator Dinas Lingkungan Hidup Kabupaten Garut",
    phone: "081383899277",
    email: "rifki.ak212@gmail.com",
  },

  // Daftar program kerja
  programs: [
    {
      id: 1,
      title: "Pengumpulan Sampah Terpilah",
      description:
        "Sampah dikumpulkan dari warga yang telah memilah dari sumbernya menjadi organik, anorganik, dan residu.",
    },
    {
      id: 2,
      title: "Pengolahan Sampah Organik",
      description: "Sampah organik diolah menjadi kompos berkualitas.",
    },
    {
      id: 3,
      title: "Pelatihan & Edukasi",
      description:
        "Kegiatan rutin peningkatan kapasitas warga dalam pengelolaan sampah dan kesadaran lingkungan.",
    },
    {
      id: 4,
      title: "Pemberdayaan Limbah Kreatif",
      description:
        "Pemberdayaan masyarakat melalui pemanfaatan limbah menjadi karya seni",
    },
    {
      id: 5,
      title: "Sinergi Program Pertanian",
      description:
        "Sinergi dengan program bidang pertanian",
    },
  ],

  // Data pencapaian dan statistik
  achievements: [
    {
      icon: "home",
      value: "130+",
      label: "Warga Terlayani",
    },
    {
      icon: "trash-alt",
      value: "1.4+ Ton",
      label: "Rata-rata Per Bulan",
    },
    {
      icon: "handshake",
      value: "4",
      label: "Orang Penggiat",
    },
  ],

  // Deskripsi lengkap TPS 3R
  description: "Berdiri sejak tahun 2014, Rapekan bergerak sebagai inisiatif sosial dan ekonomi yang berkomitmen pada lingkungan. Saat ini, kami berperan sebagai Kelompok Pemanfaat dan Pemelihara (KPP) TPS 3R Rapekan, sebuah mandat resmi dari Dinas Lingkungan Hidup Kabupaten Garut. Bertempat di RW 06 Desa Pakuwon, Kecamatan Cisurupan, KPP kami terdiri dari 7 anggota yang telah diresmikan melalui Surat Keputusan (SK) Pemerintah Desa Pakuwon pada tahun 2023. Legalitas ini memperkuat dedikasi kami dalam mengelola dan memelihara TPS 3R secara berkelanjutan.",
};

// ================================
// SECTION: UTILITY FUNCTIONS
// ================================

/**
 * FUNCTION: getFacilitatorInfo()
 * DESKRIPSI: Mengambil data fasilitator dari tps3rData
 * RETURN: Object data fasilitator
 */
export const getFacilitatorInfo = () => {
  return tps3rData.facilitator;
};

/**
 * FUNCTION: getPrograms()
 * DESKRIPSI: Mengambil daftar program kerja dari tps3rData
 * RETURN: Array of program objects
 */
export const getPrograms = () => {
  return tps3rData.programs;
};

/**
 * FUNCTION: getAchievements()
 * DESKRIPSI: Mengambil data pencapaian dari tps3rData
 * RETURN: Array of achievement objects
 */
export const getAchievements = () => {
  return tps3rData.achievements;
};

/**
 * FUNCTION: getTPS3RInfo()
 * DESKRIPSI: Mengambil informasi dasar TPS 3R
 * RETURN: Object dengan informasi dasar
 */
export const getTPS3RInfo = () => {
  return {
    name: tps3rData.name,
    location: tps3rData.location,
    manager: tps3rData.manager,
    responsiblePerson: tps3rData.responsiblePerson,
    familiesServed: tps3rData.familiesServed,
    description: tps3rData.description,
  };
};

// ================================
// SECTION: MAP UTILITIES
// ================================

/**
 * FUNCTION: getMapUrl()
 * DESKRIPSI: Generate URL embed Google Maps
 * RETURN: String URL embed maps
 */
export const getMapUrl = () => {
  const location = "TPS 3R, Garut";
  const encodedLocation = encodeURIComponent(location);
  return `https://www.google.com/maps?q=${encodedLocation}&output=embed`;
};

// ================================
// SECTION: CONTACT FUNCTIONS
// ================================

/**
 * FUNCTION: contactFacilitator(type, value)
 * DESKRIPSI: Menangani aksi kontak fasilitator
 * PARAMETERS:
 *   - type: 'phone' atau 'email'
 *   - value: nilai kontak (nomor telepon atau email)
 */
export const contactFacilitator = (type, value) => {
  if (type === "phone") {
    // Membuka aplikasi telepon
    window.open(`tel:${value}`, "_self");
  } else if (type === "email") {
    // Membuka aplikasi email
    window.open(`mailto:${value}`, "_self");
  }
};

// ================================
// SECTION: DEFAULT EXPORT
// ================================

/**
 * DEFAULT EXPORT
 * DESKRIPSI: Export semua functions sebagai object
 */
export default {
  tps3rData,
  getFacilitatorInfo,
  getPrograms,
  getAchievements,
  getTPS3RInfo,
  getMapUrl,
  contactFacilitator,
};
