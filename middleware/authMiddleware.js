// src/middleware/authMiddleware.js
const admin = require('../config/firebaseAdmin');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decodedToken = await admin.auth().verifyIdToken(token);
      
      const user = await User.findOneAndUpdate(
        { firebaseUid: decodedToken.uid },
        { 
          email: decodedToken.email,
          nama: decodedToken.name || decodedToken.email,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      req.user = user;
      next();
    } catch (error) {
      console.error('Error verifikasi token di middleware:', error);
      res.status(401).json({ message: 'Tidak terotorisasi, token gagal' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Tidak terotorisasi, tidak ada token' });
  }
};