// src/models/Laporan.js
const mongoose = require('mongoose');

const LaporanSchema = new mongoose.Schema(
  {
    judul: {
      type: String,
      required: [true, 'Judul laporan tidak boleh kosong'],
      trim: true,
    },
    deskripsi: {
      type: String,
      required: [true, 'Deskripsi laporan tidak boleh kosong'],
    },
    kategori: {
      type: String,
      required: true,
      enum: ['Infrastruktur', 'Lingkungan', 'Layanan Publik', 'Keamanan'],
    },
    status: {
      type: String,
      required: true,
      enum: ['Baru', 'Diproses', 'Selesai'],
      default: 'Baru', // Status default saat laporan pertama kali dibuat
    },
    // Ini adalah bagian penting untuk menghubungkan Laporan dengan User
    pelapor: {
      type: mongoose.Schema.Types.ObjectId, // Menyimpan ID dari user
      ref: 'User', // Merujuk ke model 'User'
      required: true,
    },
  },
  {
    // Opsi ini akan otomatis menambahkan field `createdAt` dan `updatedAt`
    timestamps: true,
  }
);

module.exports = mongoose.model('Laporan', LaporanSchema);