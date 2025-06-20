// src/graphql/typeDefs.js

const typeDefs = `#graphql
  type Laporan {
    id: ID!
    judul: String!
    deskripsi: String!  
    kategori: String!
    status: String!
    createdAt: String! 
  }

  type Query {
    laporan(status: String): [Laporan]
  }
`;

module.exports = typeDefs;