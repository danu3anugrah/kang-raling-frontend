/**
  COMPOSABLE & UTILITY FUNCTIONS UNTUK EDUCATION PAGE
  Deskripsi: State management dan utility functions untuk halaman edukasi
  Tanggal: [15/11/2025]
  Developer: [Danu Tri Anugrah]
 */

import { ref } from 'vue';

// ==================== E-BOOKS COMPOSABLE ====================

/**
 * COMPOSABLE UNTUK E-BOOKS DATA
 * Mengelola data dan state untuk koleksi e-book
 */
export function useEbooks() {
  /**
   * DATA E-BOOKS
   * Array berisi informasi semua e-book yang tersedia
   */
  const ebooks = ref([
    {
      id: 1,
      title: "Buku Saku Budidaya Maggot",
      description: "Panduan lengkap budidaya maggot untuk pengolahan sampah organik yang efektif dan menghasilkan.",
      viewUrl: "https://drive.google.com/file/d/11CxhYbqUXDkz0O0tzOyoIAwMEp-y-7-d/view?usp=drive_link",
      downloadUrl: "https://drive.google.com/uc?export=download&id=11CxhYbqUXDkz0O0tzOyoIAwMEp-y-7-d",
      type: "PDF",
      coverImage: "@/assets/images/cover_edu/maggot_cover.jpg",
      altText: "Cover Buku Saku Budidaya Maggot - Panduan budidaya maggot untuk pengolahan sampah organik"
    },
    {
      id: 2,
      title: "Buku Saku Ecoenzyme",
      description: "Cara membuat ecoenzyme dari sampah organik untuk pembersih alami yang ramah lingkungan.",
      viewUrl: "https://drive.google.com/file/d/1Q37BjZ1DV0u9oNt8Kkm0Tp9cmLnylH4T/view?usp=drive_link",
      downloadUrl: "https://drive.google.com/uc?export=download&id=1Q37BjZ1DV0u9oNt8Kkm0Tp9cmLnylH4T",
      type: "PDF",
      coverImage: "@/assets/images/cover_edu/ecoenzim_cover.jpg",
      altText: "Cover Buku Saku Ecoenzyme - Cara membuat ecoenzyme dari sampah organik"
    },
    {
      id: 3,
      title: "Buku Saku Kompos",
      description: "Teknik pembuatan kompos berkualitas dari sampah organik rumah tangga dengan mudah.",
      viewUrl: "https://drive.google.com/file/d/1aJ0pJaJbbjWkQm0gb6vM5JW8bx-_GXI0/view?usp=drive_link",
      downloadUrl: "https://drive.google.com/uc?export=download&id=1aJ0pJaJbbjWkQm0gb6vM5JW8bx-_GXI0",
      type: "PDF",
      coverImage: "@/assets/images/cover_edu/kompos_cover.jpg",
      altText: "Cover Buku Saku Kompos - Teknik pembuatan kompos dari sampah organik"
    },
    {
      id: 4,
      title: "Buku Saku Pemilahan",
      description: "Panduan praktis memilah sampah dari sumber untuk pengelolaan yang lebih efektif.",
      viewUrl: "https://drive.google.com/file/d/17k03vJBwxTHidAV1Aur-exDBQ0lSZizb/view?usp=drive_link",
      downloadUrl: "https://drive.google.com/uc?export=download&id=17k03vJBwxTHidAV1Aur-exDBQ0lSZizb",
      type: "PDF",
      coverImage: "@/assets/images/cover_edu/pemilahan_cover.jpg",
      altText: "Cover Buku Saku Pemilahan - Panduan praktis memilah sampah dari sumber"
    }
  ]);

  return {
    ebooks
  };
}

// ==================== VIDEOS COMPOSABLE ====================

/**
 * COMPOSABLE UNTUK VIDEOS DATA
 * Mengelola data dan state untuk koleksi video tutorial
 */
export function useVideos() {
  /**
   * DATA VIDEOS
   * Array berisi informasi semua video tutorial yang tersedia
   */
  const videos = ref([
    {
      id: 1,
      title: "Cara Pembuatan Sabun Dari Minyak Jelantah",
      description: "Tutorial membuat sabun ramah lingkungan dengan memanfaatkan minyak jelantah bekas.",
      embedUrl: "https://drive.google.com/file/d/1I2y0rS3pzgInvcz-blfMJFHap0aK7O67/preview",
      type: "Video Tutorial"
    },
    {
      id: 2,
      title: "Cara Pembuatan Eco-Brick",
      description: "Pelajari cara membuat eco-brick dari botol plastik bekas untuk bahan bangunan alternatif.",
      embedUrl: "https://drive.google.com/file/d/15sfM0mQP-E7YLzpUdWfvDxHiV4QkbmYJ/preview",
      type: "Video Tutorial"
    },
    {
      id: 3,
      title: "Produk yang Dihasilkan dari Pemanfaatan Sampah",
      description: "Inspirasi produk bernilai ekonomi dari berbagai jenis sampah yang dapat didaur ulang.",
      embedUrl: "https://drive.google.com/file/d/1JACJtoE43L8rLoetCab2tEWcd7aPgaUS/preview",
      type: "Video Tutorial"
    }
  ]);

  return {
    videos
  };
}

// ==================== MAIN EDUCATION COMPOSABLE ====================

/**
 * MAIN EDUCATION COMPOSABLE
 * Mengelola business logic utama untuk halaman edukasi
 */
export function useEducation() {
  /**
   * HANDLE CONTACT ACTION
   * Navigasi ke halaman contact atau membuka modal contact
   */
  const handleContact = () => {
    // Navigate to contact page
    window.location.href = '/contact';
    
    // Alternative: Open contact modal
    // openContactModal();
  };

  /**
   * TRACK DOWNLOAD ACTIVITY
   * Melacak aktivitas download untuk analytics
   * @param {string} ebookTitle - Judul e-book yang didownload
   */
  const trackDownload = (ebookTitle) => {
    // Analytics tracking for downloads
    console.log(`Download tracked: ${ebookTitle}`);
    
    // Implementation for analytics service (Google Analytics, etc.)
    // gtag('event', 'download', {
    //   'event_category': 'Ebook',
    //   'event_label': ebookTitle
    // });
  };

  /**
   * TRACK VIDEO VIEW ACTIVITY
   * Melacak aktivitas penontonan video untuk analytics
   * @param {string} videoTitle - Judul video yang ditonton
   */
  const trackVideoView = (videoTitle) => {
    // Analytics tracking for video views
    console.log(`Video view tracked: ${videoTitle}`);
    
    // Implementation for analytics service
    // gtag('event', 'video_view', {
    //   'event_category': 'Video Tutorial',
    //   'event_label': videoTitle
    // });
  };

  return {
    handleContact,
    trackDownload,
    trackVideoView
  };
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * EDUCATION UTILITY FUNCTIONS
 * Helper functions untuk halaman edukasi
 */
export function useEducationUtils() {
  /**
   * FORMAT FILE SIZE
   * Mengkonversi bytes menjadi format yang mudah dibaca
   * @param {number} bytes - Ukuran file dalam bytes
   * @returns {string} Ukuran file yang diformat
   */
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  /**
   * GET DOWNLOAD COUNT
   * Mendapatkan jumlah download untuk e-book tertentu
   * @param {number} ebookId - ID e-book
   * @returns {number} Jumlah download
   */
  const getDownloadCount = (ebookId) => {
    // Mock function - in real implementation, fetch from API
    const downloadCounts = {
      1: 150,  // Budidaya Maggot
      2: 89,   // Ecoenzyme
      3: 120,  // Kompos
      4: 75    // Pemilahan
    };
    return downloadCounts[ebookId] || 0;
  };

  /**
   * GET EBOOK COVER IMAGE
   * Mendapatkan path cover image untuk e-book
   * @param {string} ebookType - Jenis e-book
   * @returns {string} Path gambar cover
   */
  const getEbookCoverImage = (ebookType) => {
    const coverImages = {
      'maggot': '@/assets/images/cover_edu/maggot_cover.jpg',
      'ecoenzim': '@/assets/images/cover_edu/ecoenzim_cover.jpg',
      'kompos': '@/assets/images/cover_edu/kompos_cover.jpg',
      'pemilahan': '@/assets/images/cover_edu/pemilahan_cover.jpg'
    };
    return coverImages[ebookType] || '@/assets/images/cover_edu/default_cover.jpg';
  };

  return {
    formatFileSize,
    getDownloadCount,
    getEbookCoverImage
  };
}

// Export semua functions sebagai default
export default {
  useEbooks,
  useVideos,
  useEducation,
  useEducationUtils
};