// src/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: [true, 'Nama tidak boleh kosong'],
    },
    email: {
      type: String,
      required: [true, 'Email tidak boleh kosong'],
      unique: true, // Setiap email harus unik
      match: [/^\S+@\S+\.\S+$/, 'Format email tidak valid'],
    },
    // Password ini untuk login admin/petugas.
    // Tidak wajib karena pengguna masyarakat login via Firebase.
    password: {
      type: String,
    },
    // ID unik dari Firebase untuk pengguna masyarakat
    firebaseUid: {
      type: String,
      unique: true,
      sparse: true, // Memungkinkan beberapa dokumen punya nilai null untuk field unik ini
    },
    role: {
      type: String,
      enum: ['masyarakat', 'petugas', 'admin'],
      default: 'masyarakat',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', UserSchema);