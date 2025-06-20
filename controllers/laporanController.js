// src/controllers/laporanController.js
const Laporan = require('../models/Laporan');

exports.createLaporan = async (req, res) => {
  try {
    const { judul, deskripsi, kategori } = req.body;
    if (!req.user) {
      return res.status(401).json({ message: 'User tidak ditemukan setelah otentikasi.' });
    }
    const pelaporId = req.user._id;

    if (!judul || !deskripsi || !kategori) {
      return res.status(400).json({ message: 'Semua field wajib diisi' });
    }

    const laporanBaru = new Laporan({
      judul,
      deskripsi,
      kategori,
      pelapor: pelaporId,
    });

    const savedLaporan = await laporanBaru.save();
    res.status(201).json({
      message: 'Laporan berhasil dibuat!',
      data: savedLaporan,
    });
  } catch (error) {
    console.error("!!! ERROR di createLaporan Controller:", error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server saat memproses laporan.', error: error.message });
  }
};