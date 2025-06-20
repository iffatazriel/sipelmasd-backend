// src/routes/laporanRoutes.js
const express = require('express');
const router = express.Router();
const { createLaporan } = require('../controllers/laporanController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createLaporan);

module.exports = router;