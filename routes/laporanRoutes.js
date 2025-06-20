// src/routes/laporanRoutes.js
const express = require('express');
const router = express.Router();

// Kita hanya mengimpor createLaporan
const { createLaporan } = require('../controllers/laporanController');
const { protect } = require('../middleware/authMiddleware');

// Hanya ada rute untuk membuat laporan
router.post('/', protect, createLaporan);

module.exports = router;