// server.js (Versi yang sudah diperbaiki)

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

// Impor untuk Apollo Server (Cara Modern)
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');

// Impor Model & Schema GraphQL
const Laporan = require('./models/Laporan');
const typeDefs = require('./graphql/schema'); // Kita akan buat file ini
const resolvers = require('./graphql/resolvers'); // Kita akan buat file ini

const app = express();

// Middleware dasar
app.use(cors());
app.use(express.json());

// Fungsi utama untuk menjalankan server
const startServer = async () => {
  // Hubungkan ke Database
  await connectDB();

  // Buat instance Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Mulai Apollo Server
  await server.start();

  // Terapkan middleware Apollo Server ke Express di path /graphql
  app.use('/graphql', cors(), express.json(), expressMiddleware(server));

  // --- REST API ROUTES --- (Tetap ada di sini)
  app.use('/api/auth', require('./routes/authRoutes'));
  app.use('/api/laporan', require('./routes/laporanRoutes'));
  
  // Route sederhana untuk testing
  app.get('/', (req, res) => {
    res.send('API SiPelMasD Berjalan...');
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
};

startServer();