/**
    MODULE ECOMAP DATA MANAGEMENT & ANALYTICS
    Deskripsi: Modul Vue composable untuk mengelola data monitoring timbulan sampah
    Tanggal: [15/11/2025]
    Developer: [Danu Tri Anugrah]
 */

import { ref } from 'vue';

// =============================================
// HOOK: useProducts
// Deskripsi: Mengelola data produk toko
// Return: Array produk dengan detail lengkap
// =============================================
export function useProducts() {
  // Data produk dalam reactive reference
  const products = ref([
    {
      id: 1,
      name: "Ecobrick",
      description: "Botol plastik yang diisi padat dengan sampah plastik non-organik untuk dijadikan bahan bangunan ramah lingkungan.",
      shopeeUrl: "https://id.shp.ee/H5s9LsG",
      whatsappUrl: "https://wa.me/6289693773669?text=Halo%20Kang%20Raling,%20saya%20tertarik%20dengan%20produk%20Ecobrick",
      badge: "Best Seller",
      badgeType: "best-seller",
      icon: "bi-bricks"
    },
    {
      id: 2,
      name: "Gantungan Kunci",
      description: "Gantungan kunci unik dan kreatif dari bahan daur ulang. Cocok untuk souvenir atau hadiah ramah lingkungan.",
      shopeeUrl: "https://id.shp.ee/5At5Myv",
      whatsappUrl: "https://wa.me/6289693773669?text=Halo%20Kang%20Raling,%20saya%20tertarik%20dengan%20produk%20Gantungan%20Kunci",
      badge: "Popular",
      badgeType: "popular",
      icon: "bi-key"
    },
    {
      id: 3,
      name: "Kotak Tisu",
      description: "Kotak tisu cantik dan fungsional dari bahan daur ulang. Sempurna untuk mempercantik ruangan Anda.",
      shopeeUrl: "https://id.shp.ee/cZfsXK6",
      whatsappUrl: "https://wa.me/6289693773669?text=Halo%20Kang%20Raling,%20saya%20tertarik%20dengan%20produk%20Kotak%20Tisu",
      badge: "New",
      badgeType: "new",
      icon: "bi-box"
    }
  ]);

  return {
    products
  };
}

// =============================================
// HOOK: useStoreFeatures
// Deskripsi: Mengelola data fitur toko dan alasan memilih
// Return: Data fitur dan keunggulan toko
// =============================================
export function useStoreFeatures() {
  // Data fitur utama toko
  const features = ref([
    {
      icon: "bi-shield-check",
      title: "Produk Terpercaya",
      description: "100% hasil daur ulang berkualitas"
    },
    {
      icon: "bi-truck",
      title: "Pengiriman Cepat",
      description: "Dikirim dari Garut, Jawa Barat"
    },
    {
      icon: "bi-heart",
      title: "Ramah Lingkungan",
      description: "Mendukung ekonomi sirkular"
    }
  ]);

  // Data alasan memilih toko
  const whyChooseUs = ref([
    {
      icon: "bi-recycle",
      title: "100% Daur Ulang",
      description: "Semua produk dibuat dari bahan daur ulang berkualitas tinggi"
    },
    {
      icon: "bi-people",
      title: "Pemberdayaan Masyarakat",
      description: "Mendukung ekonomi lokal dan pemberdayaan warga binaan"
    },
    {
      icon: "bi-hand-thumbs-up",
      title: "Kualitas Terjamin",
      description: "Produk dibuat dengan teliti dan kontrol kualitas yang ketat"
    },
    {
      icon: "bi-globe",
      title: "Peduli Lingkungan",
      description: "Setiap pembelian berkontribusi untuk bumi yang lebih bersih"
    }
  ]);

  return {
    features,
    whyChooseUs
  };
}

// =============================================
// HOOK: useShopAnalytics
// Deskripsi: Fungsi tracking untuk analytics
// Return: Fungsi-fungsi tracking event
// =============================================
export function useShopAnalytics() {
  /**
   * Track klik tombol Shopee
   * @param {string} productName - Nama produk yang diklik (default: 'general')
   */
  const trackShopeeClick = (productName = 'general') => {
    // Tracking untuk klik Shopee
    console.log(`Shopee click tracked: ${productName}`);
    // TODO: Implementasi analytics tracking sebenarnya
    // Contoh: gtag('event', 'shopee_click', { product_name: productName });
  };

  /**
   * Track klik tombol WhatsApp
   * @param {string} productName - Nama produk yang diklik (default: 'general')
   */
  const trackWhatsAppClick = (productName = 'general') => {
    // Tracking untuk klik WhatsApp
    console.log(`WhatsApp click tracked: ${productName}`);
    // TODO: Implementasi analytics tracking sebenarnya
    // Contoh: gtag('event', 'whatsapp_click', { product_name: productName });
  };

  /**
   * Track view produk
   * @param {string} productName - Nama produk yang dilihat
   */
  const trackProductView = (productName) => {
    // Tracking untuk view produk
    console.log(`Product view tracked: ${productName}`);
    // TODO: Implementasi analytics tracking sebenarnya
  };

  return {
    trackShopeeClick,
    trackWhatsAppClick,
    trackProductView
  };
}

// =============================================
// HOOK: useShopUtils
// Deskripsi: Utility functions untuk toko
// Return: Fungsi-fungsi utility
// =============================================
export function useShopUtils() {
  /**
   * Format harga ke format Rupiah
   * @param {number} price - Harga dalam angka
   * @returns {string} Harga yang diformat
   */
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  /**
   * Dapatkan rating produk (mock function)
   * @param {number} productId - ID produk
   * @returns {number} Rating produk
   */
  const getProductRating = (productId) => {
    // Data rating mock (sementara)
    const ratings = {
      1: 4.8,  // Ecobrick
      2: 4.6,  // Gantungan Kunci
      3: 4.7   // Kotak Tisu
    };
    return ratings[productId] || 4.5; // Default 4.5 jika tidak ditemukan
  };

  /**
   * Dapatkan jumlah penjualan produk (mock function)
   * @param {number} productId - ID produk
   * @returns {number} Jumlah penjualan
   */
  const getProductSales = (productId) => {
    // Data penjualan mock (sementara)
    const sales = {
      1: 150,  // Ecobrick
      2: 89,   // Gantungan Kunci
      3: 45    // Kotak Tisu
    };
    return sales[productId] || 0; // Default 0 jika tidak ditemukan
  };

  return {
    formatPrice,
    getProductRating,
    getProductSales
  };
}