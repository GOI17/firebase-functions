const admin = require('firebase-admin');
const credentials = require('./credentials.json');

admin.initializeApp({
  credential: admin.credential.cert(credentials),
  databaseURL: 'https://fir-functions-15864.firebaseio.com'
});

const db = admin.firestore();

module.exports = db;

