const mongoose = require('mongoose');

const LaporanSchema = new mongoose.Schema({
  judul: { type: String, required: true },
  deskripsi: { type: String, required: true },
  kategori: { type: String, required: true, enum: ['Infrastruktur', 'Layanan Publik', 'Keamanan', 'Lainnya'] },
  lokasi: { type: String, required: true },
  foto_laporan: { type: String }, // URL ke gambar
  status: { type: String, default: 'Dikirim', enum: ['Dikirim', 'Diproses', 'Selesai', 'Ditolak'] },
  pelapor: {
    uid: { type: String, required: true }, // UID dari Firebase Auth
    nama: { type: String, required: true }
  },
  tanggapan_petugas: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Laporan', LaporanSchema);