// src/middleware/authMiddleware.js
const admin = require('../config/firebaseAdmin');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;

  // Cek apakah header Authorization ada dan berformat "Bearer <token>"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Ambil token dari header
      token = req.headers.authorization.split(' ')[1];

      // Verifikasi token menggunakan firebase-admin
      const decodedToken = await admin.auth().verifyIdToken(token);
      
      // Cari pengguna di DB kita berdasarkan firebaseUid dari token
      // Jika tidak ada, buat pengguna baru (pola find-or-create)
      const user = await User.findOneAndUpdate(
        { firebaseUid: decodedToken.uid },
        { 
          email: decodedToken.email,
          nama: decodedToken.name,
          firebaseUid: decodedToken.uid
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      // Lampirkan data user dari DB kita ke object request
      req.user = user;

      next(); // Lanjutkan ke controller berikutnya
    } catch (error) {
      console.error('Error verifikasi token:', error);
      res.status(401).json({ message: 'Tidak terotorisasi, token gagal' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Tidak terotorisasi, tidak ada token' });
  }
};