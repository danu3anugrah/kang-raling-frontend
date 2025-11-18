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
  name: "Bank Sampah Binangkit",
  location:
    "Jl. Tanjakan Kp. Babakan Kalapa, Desa Mekargalih, Kec. Tarogong Kidul, Kabupaten Garut, Jawa Barat 44151",
  manager: "KSM Binangkit",
  responsiblePerson: "Upit Sarimanah",
  familiesServed: "80",

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
      title:
        "Penyetoran dan Penimbangan Sampah Anorganik Terpilah (Tabungan Sampah)",
      description:
        "Anggota (nasabah) menyetorkan sampah anorganik yang telah dipilah (misalnya plastik, kertas, botol) ke bank sampah. Sampah ditimbang dan dicatat sebagai saldo tabungan dalam buku rekening nasabah.",
    },
    {
      id: 2,
      title: "Pelatihan, Penyuluhan, dan Sosialisasi Pengelolaan Sampah",
      description: "Kegiatan edukasi rutin kepada masyarakat mengenai pentingnya memilah sampah, teknik pemilahan yang benar, serta manfaat lingkungan dan ekonomi dari bank sampah.",
    },
    {
      id: 3,
      title: "Pengembangan Produk Daur Ulang Kreatif",
      description:
        "Program untuk mengolah sampah anorganik tertentu menjadi produk bernilai jual tinggi (misalnya kerajinan tangan, ecobrick).",
    },
  ],

  // Data pencapaian dan statistik
  achievements: [
    {
      icon: "home",
      value: "80+",
      label: "Total Nasabah",
    },
    {
      icon: "trash-alt",
      value: "10+ Kg",
      label: "Rata-rata Setiap Operasional",
    },
    {
      icon: "handshake",
      value: "18",
      label: "Petugas Bank Sampah",
    },
  ],

  // Deskripsi lengkap TPS 3R
  description:
    "Bank Sampah KSM Binangkit merupakan inisiatif berbasis komunitas yang didedikasikan untuk peningkatan kesadaran lingkungan dan pemberdayaan ekonomi masyarakat. Kami menerapkan sistem Tabungan Sampah, di mana sampah anorganik yang disetor oleh nasabah dicatat dan dihargai, kemudian dijual secara kolektif ke industri daur ulang. Melalui program edukasi dan penimbangan rutin, KSM Binangkit tidak hanya mengurangi volume sampah yang berakhir di TPA, tetapi juga memberikan kontribusi nyata terhadap pendapatan keluarga sekaligus mewujudkan lingkungan permukiman yang bersih dan lestari.",
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
  const location = "Bank Sampah KSM Binangkit, Garut";
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
