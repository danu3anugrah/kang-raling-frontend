/* 
    DATA MODULE - TPS 3R Muara Sanding
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
  name: "TPS 3R PWA GSI",
  location:
    "Peacesantren Welas Asih, Sukarasa, Kec. Samarang, Kabupaten Garut, Jawa Barat 44161",
  manager: "-",
  responsiblePerson: "-",
  familiesServed: "-",

  // Data fasilitator
  facilitator: {
    name: "Tini Martini Tapran, S.Si., M.Sos.",
    position: "Koordinator Fasilitator Dinas Lingkungan Hidup Kabupaten Garut",
    phone: "08122456107",
    email: "-",
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
  ],

  // Data pencapaian dan statistik
  achievements: [
    {
      icon: "home",
      value: "-",
      label: "Warga Terlayani",
    },
    {
      icon: "trash-alt",
      value: "2.7+ Ton",
      label: "Rata-rata Per Bulan",
    },
    {
      icon: "handshake",
      value: "-",
      label: "Orang Penggiat",
    },
  ],

  // Deskripsi lengkap TPS 3R
  description: "TPS 3R PWA - GSI merupakan pusat pengelolaan sampah terpadu yang melayani masyarakat dan Peacesantren Welas Asih. Dengan komitmen kuat dalam menerapkan prinsip 3R (Reduce, Reuse, Recycle), kami berfokus pada pengelolaan sampah yang berkelanjutan. Layanan kami mencakup pengumpulan sampah terpilah, pengolahan sampah organik menjadi kompos, dan berbagai program edukasi lingkungan untuk meningkatkan kesadaran masyarakat tentang pentingnya pengelolaan sampah yang baik.",
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
  const location = "Peacesantren Welas Asih, Garut";
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
