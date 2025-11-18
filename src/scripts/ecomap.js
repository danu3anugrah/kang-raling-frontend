/**
    COMPOSABLE & UTILITY FUNCTIONS UNTUK ECOMAP PAGE
    Deskripsi: State management dan utility functions untuk halaman ecomap
    Tanggal: [15/11/2025]
    Developer: [Danu Tri Anugrah]
 */

import { computed, nextTick } from "vue";
import Chart from "chart.js/auto";

// ==================== DATA MANAGEMENT COMPOSABLE ====================

/**
 * COMPOSABLE UNTUK DATA MANAGEMENT
 * Mengelola fetching dan state data dari API
 */
export function useEcomapData(desas, ecomaps, loading) {
  /**
   * FETCH DATA FROM API
   * Mengambil data desa dan ecomaps dari service
   */
  const fetchData = async (ecomapService) => {
    try {
      loading.value = true;

      const [desasRes, ecomapsRes] = await Promise.all([
        ecomapService.getAllDesas(),
        ecomapService.getAllEcomaps(),
      ]);

      desas.value = desasRes.data;
      ecomaps.value = ecomapsRes.data;
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      loading.value = false;
    }
  };

  return {
    fetchData,
  };
}

// ==================== FILTER MANAGEMENT COMPOSABLE ====================

/**
 * COMPOSABLE UNTUK FILTER MANAGEMENT
 * Mengelola filtering data berdasarkan kriteria yang dipilih
 */
export function useEcomapFilters(desas, ecomaps, filters) {
  const filteredEcomaps = computed(() => {
    let filtered = ecomaps.value;

    if (filters.value.desa) {
      filtered = filtered.filter((e) => e.desa_id == filters.value.desa);
    }

    if (filters.value.bulan) {
      filtered = filtered.filter((e) => {
        const month = new Date(e.tanggal).getMonth() + 1;
        return month == filters.value.bulan;
      });
    }

    if (filters.value.tahun) {
      filtered = filtered.filter((e) => {
        const year = new Date(e.tanggal).getFullYear();
        return year == filters.value.tahun;
      });
    }

    return filtered;
  });

  const filteredDesas = computed(() => {
    if (filters.value.desa) {
      return desas.value.filter((d) => d.id == filters.value.desa);
    }
    return desas.value;
  });

  const availableYears = computed(() => {
    const years = ecomaps.value.map((e) => new Date(e.tanggal).getFullYear());
    return [...new Set(years)].sort((a, b) => b - a);
  });

  const filteredStats = computed(() => {
    const totalOrganik = filteredEcomaps.value.reduce(
      (sum, e) => sum + parseFloat(e.jumlah_organik || 0),
      0
    );
    const totalAnorganik = filteredEcomaps.value.reduce(
      (sum, e) => sum + parseFloat(e.jumlah_anorganik || 0),
      0
    );
    const totalResidu = filteredEcomaps.value.reduce(
      (sum, e) => sum + parseFloat(e.jumlah_residu || 0),
      0
    );

    return {
      totalOrganik: totalOrganik.toFixed(1),
      totalAnorganik: totalAnorganik.toFixed(1),
      totalResidu: totalResidu.toFixed(1),
      grandTotal: (totalOrganik + totalAnorganik + totalResidu).toFixed(1),
    };
  });

  return {
    filteredEcomaps,
    filteredDesas,
    availableYears,
    filteredStats,
  };
}

// ==================== CHART MANAGEMENT COMPOSABLE ====================

/**
 * COMPOSABLE UNTUK CHART MANAGEMENT
 * Mengelola pembuatan, update, dan destruksi chart
 */
export function useEcomapCharts(
  barChart,
  pieChart,
  filteredDesas,
  filteredStats,
  filters,
  filteredEcomaps
) {
  let barChartInstance = null;
  let pieChartInstance = null;

  const getChartData = () => {
    const desaData = {};

    filteredDesas.value.forEach((desa) => {
      const ecomapsForDesa = getEcomapsByDesa(desa.id);
      const organik = ecomapsForDesa.reduce(
        (sum, e) => sum + parseFloat(e.jumlah_organik || 0),
        0
      );
      const anorganik = ecomapsForDesa.reduce(
        (sum, e) => sum + parseFloat(e.jumlah_anorganik || 0),
        0
      );
      const residu = ecomapsForDesa.reduce(
        (sum, e) => sum + parseFloat(e.jumlah_residu || 0),
        0
      );

      desaData[desa.nama_desa] = { organik, anorganik, residu };
    });

    return desaData;
  };

  const getEcomapsByDesa = (desaId) => {
    return filteredEcomaps.value.filter((e) => e.desa_id === desaId);
  };

  const createBarChart = () => {
    if (!barChart.value) return;

    const chartData = getChartData();
    const labels = Object.keys(chartData);
    const organikData = labels.map((label) => chartData[label].organik);
    const anorganikData = labels.map((label) => chartData[label].anorganik);
    const residuData = labels.map((label) => chartData[label].residu);

    if (barChartInstance) {
      barChartInstance.destroy();
    }

    barChartInstance = new Chart(barChart.value, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Organik (kg)",
            data: organikData,
            backgroundColor: "#10a85d",
            borderRadius: 8,
          },
          {
            label: "Anorganik (kg)",
            data: anorganikData,
            backgroundColor: "#fbbf24",
            borderRadius: 8,
          },
          {
            label: "Residu (kg)",
            data: residuData,
            backgroundColor: "#64748b",
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: "top",
            labels: {
              font: {
                size: 13,
                family: "Poppins",
              },
              padding: 15,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "#e2e8f0",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  };

  const createPieChart = () => {
    if (!pieChart.value) return;

    if (pieChartInstance) {
      pieChartInstance.destroy();
    }

    pieChartInstance = new Chart(pieChart.value, {
      type: "doughnut",
      data: {
        labels: ["Organik", "Anorganik", "Residu"],
        datasets: [
          {
            data: [
              parseFloat(filteredStats.value.totalOrganik || 0),
              parseFloat(filteredStats.value.totalAnorganik || 0),
              parseFloat(filteredStats.value.totalResidu || 0),
            ],
            backgroundColor: ["#10a85d", "#fbbf24", "#64748b"],
            borderWidth: 3,
            borderColor: "#ffffff",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              font: {
                size: 13,
                family: "Poppins",
              },
              padding: 15,
            },
          },
        },
      },
    });
  };

  const updateCharts = async () => {
    await nextTick();
    createBarChart();
    createPieChart();
  };

  return {
    createBarChart,
    createPieChart,
    updateCharts,
    barChartInstance,
    pieChartInstance,
  };
}

// ==================== TABLE MANAGEMENT COMPOSABLE ====================

/**
 * COMPOSABLE UNTUK TABLE MANAGEMENT
 * Mengelola behavior tabel dan perhitungan data
 */
export function useEcomapTables(activeAccordion, filteredEcomaps) {
  const toggleAccordion = (index) => {
    activeAccordion.value = activeAccordion.value === index ? null : index;
  };

  const getEcomapsByDesa = (desaId) => {
    return filteredEcomaps.value.filter((e) => e.desa_id === desaId);
  };

  const getTotalPerRow = (ecomap) => {
    const organik = parseFloat(ecomap.jumlah_organik || 0);
    const anorganik = parseFloat(ecomap.jumlah_anorganik || 0);
    const residu = parseFloat(ecomap.jumlah_residu || 0);
    return (organik + anorganik + residu).toFixed(1);
  };

  const getSubtotalOrganik = (desaId) => {
    return getEcomapsByDesa(desaId)
      .reduce((sum, e) => sum + parseFloat(e.jumlah_organik || 0), 0)
      .toFixed(1);
  };

  const getSubtotalAnorganik = (desaId) => {
    return getEcomapsByDesa(desaId)
      .reduce((sum, e) => sum + parseFloat(e.jumlah_anorganik || 0), 0)
      .toFixed(1);
  };

  const getSubtotalResidu = (desaId) => {
    return getEcomapsByDesa(desaId)
      .reduce((sum, e) => sum + parseFloat(e.jumlah_residu || 0), 0)
      .toFixed(1);
  };

  const getSubtotalTotal = (desaId) => {
    return getEcomapsByDesa(desaId)
      .reduce((sum, e) => {
        return (
          sum +
          parseFloat(e.jumlah_organik || 0) +
          parseFloat(e.jumlah_anorganik || 0) +
          parseFloat(e.jumlah_residu || 0)
        );
      }, 0)
      .toFixed(1);
  };

  return {
    toggleAccordion,
    getEcomapsByDesa,
    getTotalPerRow,
    getSubtotalOrganik,
    getSubtotalAnorganik,
    getSubtotalResidu,
    getSubtotalTotal,
  };
}

// ==================== UTILITY FUNCTIONS COMPOSABLE ====================

/**
 * COMPOSABLE UNTUK UTILITY FUNCTIONS
 * Helper functions untuk formatting dan utilities lainnya
 */
export function useEcomapUtils() {
  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return {
    formatDate,
  };
}

// ==================== EXPORT FUNCTIONALITY COMPOSABLE ====================

/**
 * COMPOSABLE UNTUK EXPORT FUNCTIONALITY
 * Mengelola export data ke PDF, Excel, dan Print
 */
export function useEcomapExport(
  filteredDesas,
  filteredStats,
  filteredEcomaps,
  filters,
  exportLoading,
  getEcomapsByDesa,
  getTotalPerRow,
  getSubtotalOrganik,
  getSubtotalAnorganik,
  getSubtotalResidu,
  getSubtotalTotal
) {

  /**
 * EXPORT TO PDF - ULTRA SIMPLE BUT NICE
 */
const exportToPDF = async () => {
  try {
    exportLoading.value = true;
    
    const { jsPDF } = window.jspdf || await import('jspdf');
    const doc = new jsPDF();
    
    // Simple tapi rapi
    doc.setFontSize(16);
    doc.setTextColor(16, 168, 93);
    doc.text('LAPORAN DATA SAMPAH KANG RALING', 20, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Periode: ${getFilterPeriod()}`, 20, 30);
    doc.text(`Tanggal: ${new Date().toLocaleDateString('id-ID')}`, 20, 35);
    
    // Stats
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('STATISTIK:', 20, 50);
    doc.text(`📗 Organik: ${filteredStats.value.totalOrganik} kg`, 30, 60);
    doc.text(`📘 Anorganik: ${filteredStats.value.totalAnorganik} kg`, 30, 70);
    doc.text(`📙 Residu: ${filteredStats.value.totalResidu} kg`, 30, 80);
    doc.text(`📊 Total: ${filteredStats.value.grandTotal} kg`, 30, 90);
    
    // Data per desa
    let yPos = 110;
    doc.text('DATA PER DESA:', 20, yPos);
    yPos += 10;
    
    filteredDesas.value.forEach(desa => {
      const desaData = getEcomapsByDesa(desa.id);
      if (desaData.length > 0) {
        doc.setFontSize(10);
        doc.setTextColor(16, 168, 93);
        doc.text(`Desa ${desa.nama_desa}:`, 25, yPos);
        yPos += 7;
        
        doc.setFontSize(8);
        doc.setTextColor(0, 0, 0);
        doc.text(`Organik: ${getSubtotalOrganik(desa.id)} kg`, 35, yPos);
        yPos += 4;
        doc.text(`Anorganik: ${getSubtotalAnorganik(desa.id)} kg`, 35, yPos);
        yPos += 4;
        doc.text(`Residu: ${getSubtotalResidu(desa.id)} kg`, 35, yPos);
        yPos += 4;
        doc.text(`Total: ${getSubtotalTotal(desa.id)} kg`, 35, yPos);
        yPos += 8;
      }
    });
    
    doc.save(`Laporan_Sampah_${new Date().getTime()}.pdf`);
    
  } catch (error) {
    console.error('PDF Error:', error);
    alert('Gagal export PDF: ' + error.message);
  } finally {
    exportLoading.value = false;
  }
}

  /**
   * EXPORT TO EXCEL dengan ExcelJS (Lebih Aman)
   */
  const exportToExcel = async () => {
    try {
      exportLoading.value = true;

      // Dynamically import ExcelJS
      const ExcelJS = await import("exceljs");

      // Create workbook
      const workbook = new ExcelJS.Workbook();
      workbook.creator = "Kang Raling";
      workbook.created = new Date();

      // Sheet 1: Summary
      const summarySheet = workbook.addWorksheet("Ringkasan");

      // Add header
      summarySheet.mergeCells("A1:F1");
      summarySheet.getCell("A1").value =
        "LAPORAN DATA TIMBULAN SAMPAH KANG RALING";
      summarySheet.getCell("A1").font = { bold: true, size: 16 };
      summarySheet.getCell("A1").alignment = { horizontal: "center" };

      summarySheet.mergeCells("A2:F2");
      summarySheet.getCell("A2").value = `Periode: ${getFilterPeriod()}`;
      summarySheet.getCell("A2").alignment = { horizontal: "center" };

      summarySheet.mergeCells("A3:F3");
      summarySheet.getCell(
        "A3"
      ).value = `Tanggal Generate: ${new Date().toLocaleDateString("id-ID")}`;
      summarySheet.getCell("A3").alignment = { horizontal: "center" };

      // Add summary data
      summarySheet.addRow([]);
      summarySheet.addRow(["RINGKASAN STATISTIK"]);
      summarySheet.addRow(["Jenis Sampah", "Jumlah (kg)"]);
      summarySheet.addRow([
        "Organik",
        parseFloat(filteredStats.value.totalOrganik),
      ]);
      summarySheet.addRow([
        "Anorganik",
        parseFloat(filteredStats.value.totalAnorganik),
      ]);
      summarySheet.addRow([
        "Residu",
        parseFloat(filteredStats.value.totalResidu),
      ]);
      summarySheet.addRow([
        "TOTAL KESELURUHAN",
        parseFloat(filteredStats.value.grandTotal),
      ]);

      // Style summary sheet
      summarySheet.getRow(5).font = { bold: true };
      summarySheet.getColumn(1).width = 20;
      summarySheet.getColumn(2).width = 15;

      // Sheet 2: Data per Desa
      filteredDesas.value.forEach((desa) => {
        const desaData = getEcomapsByDesa(desa.id);
        if (desaData.length > 0) {
          const desaSheet = workbook.addWorksheet(
            desa.nama_desa.substring(0, 31)
          );

          // Header
          desaSheet.mergeCells("A1:F1");
          desaSheet.getCell(
            "A1"
          ).value = `DATA DESA ${desa.nama_desa.toUpperCase()}`;
          desaSheet.getCell("A1").font = { bold: true, size: 14 };
          desaSheet.getCell("A1").alignment = { horizontal: "center" };

          desaSheet.mergeCells("A2:F2");
          desaSheet.getCell("A2").value = `Periode: ${getFilterPeriod()}`;
          desaSheet.getCell("A2").alignment = { horizontal: "center" };

          // Table header
          desaSheet.addRow([]);
          desaSheet.addRow([
            "No",
            "Tanggal",
            "Organik (kg)",
            "Anorganik (kg)",
            "Residu (kg)",
            "Total (kg)",
          ]);

          // Data rows
          desaData.forEach((ecomap, idx) => {
            desaSheet.addRow([
              idx + 1,
              formatDateForExport(ecomap.tanggal),
              parseFloat(ecomap.jumlah_organik || 0),
              parseFloat(ecomap.jumlah_anorganik || 0),
              parseFloat(ecomap.jumlah_residu || 0),
              parseFloat(getTotalPerRow(ecomap)),
            ]);
          });

          // Subtotal row
          desaSheet.addRow([]);
          desaSheet.addRow([
            "",
            "SUBTOTAL",
            parseFloat(getSubtotalOrganik(desa.id)),
            parseFloat(getSubtotalAnorganik(desa.id)),
            parseFloat(getSubtotalResidu(desa.id)),
            parseFloat(getSubtotalTotal(desa.id)),
          ]);

          // Style desa sheet
          desaSheet.getRow(4).font = { bold: true };
          desaSheet.getRow(desaSheet.rowCount).font = { bold: true };
          desaSheet.getRow(desaSheet.rowCount).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFE8F5F0" },
          };

          // Set column widths
          desaSheet.columns = [
            { width: 8 }, // No
            { width: 15 }, // Tanggal
            { width: 12 }, // Organik
            { width: 12 }, // Anorganik
            { width: 12 }, // Residu
            { width: 12 }, // Total
          ];
        }
      });

      // Save Excel file
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Laporan_Sampah_${getFilterPeriod()}_${new Date().getTime()}.xlsx`;
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating Excel:", error);
      alert("Gagal mengexport Excel. Silakan coba lagi.");
    } finally {
      exportLoading.value = false;
    }
  };

  /**
   * PRINT REPORT
   * Print-friendly version
   */
  const printReport = () => {
    // Create print-friendly HTML
    const printWindow = window.open("", "_blank");
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Laporan Data Sampah - Kang Raling</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            margin: 20px; 
            color: #333;
          }
          .print-header { 
            text-align: center; 
            margin-bottom: 30px;
            border-bottom: 2px solid #10a85d;
            padding-bottom: 15px;
          }
          .print-header h1 { 
            color: #10a85d; 
            margin: 0 0 10px 0;
          }
          .print-header p { 
            margin: 5px 0; 
            color: #666;
          }
          .stats-grid { 
            display: grid; 
            grid-template-columns: repeat(4, 1fr); 
            gap: 15px; 
            margin: 20px 0; 
          }
          .stat-card { 
            border: 1px solid #ddd; 
            padding: 15px; 
            border-radius: 8px; 
            text-align: center;
          }
          .stat-card.organik { border-left: 4px solid #10a85d; }
          .stat-card.anorganik { border-left: 4px solid #fbbf24; }
          .stat-card.residu { border-left: 4px solid #64748b; }
          .stat-card.total { border-left: 4px solid #3b82f6; }
          .stat-value { 
            font-size: 24px; 
            font-weight: bold; 
            margin: 10px 0 5px 0;
          }
          .stat-label { 
            font-size: 14px; 
            color: #666; 
          }
          .section-title { 
            font-size: 18px; 
            font-weight: bold; 
            margin: 25px 0 15px 0;
            color: #10a85d;
            border-bottom: 1px solid #eee;
            padding-bottom: 5px;
          }
          .data-table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 10px 0 20px 0;
            font-size: 12px;
          }
          .data-table th, .data-table td { 
            border: 1px solid #ddd; 
            padding: 8px; 
            text-align: left; 
          }
          .data-table th { 
            background-color: #f8f9fa; 
            font-weight: bold;
          }
          .data-table tfoot { 
            background-color: #e8f5f0; 
            font-weight: bold;
          }
          .organik-cell { color: #10a85d; }
          .anorganik-cell { color: #f59e0b; }
          .residu-cell { color: #64748b; }
          .total-cell { font-weight: bold; }
          .desa-section { 
            margin: 20px 0; 
            page-break-inside: avoid;
          }
          .desa-header { 
            background: #e8f5f0; 
            padding: 10px; 
            font-weight: bold; 
            border-left: 4px solid #10a85d;
          }
          @media print {
            body { margin: 10px; }
            .stats-grid { grid-template-columns: repeat(2, 1fr); }
          }
        </style>
      </head>
      <body>
        <div class="print-header">
          <h1>LAPORAN DATA TIMBULAN SAMPAH</h1>
          <p><strong>Kang Raling - Kampung Ramah Lingkungan</strong></p>
          <p>Periode: ${getFilterPeriod()}</p>
          <p>Tanggal Cetak: ${new Date().toLocaleDateString("id-ID")}</p>
        </div>

        <div class="section-title">RINGKASAN STATISTIK</div>
        <div class="stats-grid">
          <div class="stat-card organik">
            <div class="stat-label">Organik</div>
            <div class="stat-value">${filteredStats.value.totalOrganik}</div>
            <div class="stat-unit">Kilogram</div>
          </div>
          <div class="stat-card anorganik">
            <div class="stat-label">Anorganik</div>
            <div class="stat-value">${filteredStats.value.totalAnorganik}</div>
            <div class="stat-unit">Kilogram</div>
          </div>
          <div class="stat-card residu">
            <div class="stat-label">Residu</div>
            <div class="stat-value">${filteredStats.value.totalResidu}</div>
            <div class="stat-unit">Kilogram</div>
          </div>
          <div class="stat-card total">
            <div class="stat-label">Total Keseluruhan</div>
            <div class="stat-value">${filteredStats.value.grandTotal}</div>
            <div class="stat-unit">Kilogram</div>
          </div>
        </div>

        <div class="section-title">DATA DETAIL PER DESA</div>
        ${filteredDesas.value
          .map((desa) => {
            const desaData = getEcomapsByDesa(desa.id);
            if (desaData.length === 0) return "";

            return `
            <div class="desa-section">
              <div class="desa-header">
                <i class="bi bi-geo-alt-fill"></i> Desa ${desa.nama_desa} 
                <span style="float: right;">${desaData.length} entri data</span>
              </div>
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
                  ${desaData
                    .map(
                      (ecomap, idx) => `
                    <tr>
                      <td>${idx + 1}</td>
                      <td>${formatDateForExport(ecomap.tanggal)}</td>
                      <td class="organik-cell">${ecomap.jumlah_organik}</td>
                      <td class="anorganik-cell">${ecomap.jumlah_anorganik}</td>
                      <td class="residu-cell">${ecomap.jumlah_residu}</td>
                      <td class="total-cell"><strong>${getTotalPerRow(
                        ecomap
                      )}</strong></td>
                    </tr>
                  `
                    )
                    .join("")}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="2"><strong>Subtotal</strong></td>
                    <td class="organik-cell"><strong>${getSubtotalOrganik(
                      desa.id
                    )}</strong></td>
                    <td class="anorganik-cell"><strong>${getSubtotalAnorganik(
                      desa.id
                    )}</strong></td>
                    <td class="residu-cell"><strong>${getSubtotalResidu(
                      desa.id
                    )}</strong></td>
                    <td class="total-cell"><strong>${getSubtotalTotal(
                      desa.id
                    )}</strong></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          `;
          })
          .join("")}

        <div style="margin-top: 30px; text-align: center; color: #666; font-size: 12px;">
          <p>Dokumen ini dibuat secara otomatis oleh Sistem Kang Raling</p>
          <p>${window.location.href}</p>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  /**
   * HELPER FUNCTIONS
   */
  const getFilterPeriod = () => {
    const bulanNames = [
      "",
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    if (filters.value.bulan && filters.value.tahun) {
      return `${bulanNames[filters.value.bulan]} ${filters.value.tahun}`;
    } else if (filters.value.tahun) {
      return `Tahun ${filters.value.tahun}`;
    } else if (filters.value.bulan) {
      return `Bulan ${bulanNames[filters.value.bulan]}`;
    } else {
      return "Semua Periode";
    }
  };

  const formatDateForExport = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return {
    exportToPDF,
    exportToExcel,
    printReport,
  };
}

// Export semua functions sebagai default
export default {
  useEcomapData,
  useEcomapFilters,
  useEcomapCharts,
  useEcomapTables,
  useEcomapUtils,
  useEcomapExport,
};
