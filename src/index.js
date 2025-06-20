// src/index.js
require('dotenv').config();
require('./config/firebaseAdmin');
const http = require('http');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');

// Pastikan ini diaktifkan
const laporanRoutes = require('./routes/laporanRoutes');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const app = express();
const httpServer = http.createServer(app);

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  app.use(cors());
  app.options('*', cors());
  app.use(express.json());

  app.get('/', (req, res) => res.json({ message: 'API SiPelMasD Aktif' }));
  app.use('/graphql', expressMiddleware(server));
  
  // Pastikan ini juga diaktifkan
  app.use('/api/v1/laporan', laporanRoutes);

  const PORT = process.env.PORT || 8080;
  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀 Server berjalan di port ${PORT}`);
  console.log(`🚀 Endpoint GraphQL siap di http://localhost:${PORT}/graphql`);
};

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🔌 Berhasil terhubung ke MongoDB.');
    startServer();
  } catch (error) {
    console.error('❌ Koneksi ke MongoDB gagal:', error.message);
    process.exit(1);
  }
};

connectDB();