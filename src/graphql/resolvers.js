// src/graphql/resolvers.js
const Laporan = require('../models/Laporan');

const resolvers = {
  Query: {
    // Resolver sekarang menerima argumen (parent, args)
    laporan: async (parent, args) => {
      try {
        // Buat objek filter kosong
        const filter = {};

        // Jika argumen 'status' ada di dalam query, tambahkan ke objek filter
        if (args.status) {
          filter.status = args.status;
        }

        // Gunakan objek filter di dalam pencarian Mongoose.
        // Jika filter kosong, ia akan mencari semua. Jika ada isinya, ia akan memfilter.
        const semuaLaporan = await Laporan.find(filter).sort({ createdAt: -1 });
        return semuaLaporan;
      } catch (error) {
        console.error('Gagal mengambil laporan:', error);
        throw new Error('Gagal mengambil data laporan');
      }
    },
  },
};

module.exports = resolvers;