// src/config/firebaseAdmin.js
const admin = require('firebase-admin');

// Pastikan nama environment variable sesuai dengan yang Anda set di Railway
// Di Railway Anda set Key: GOOGLE_APPLICATION_CREDENTIALS_JSON
const serviceAccountJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON; 

if (!serviceAccountJson) {
  console.error("GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable is not set.");
  process.exit(1); 
}

// Parse string JSON menjadi objek JavaScript
const serviceAccount = JSON.parse(serviceAccountJson);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;