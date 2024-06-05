const mysql = require('mysql');
require('dotenv').config();

// Configuration de la connexion à la base de données
const dbConfig = {
  host: process.env.HOST_NAME,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  connectTimeout: 60000
};

const connection = mysql.createConnection(dbConfig);
connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    return null;
  }
  //console.log('Connecté à la base de données !');
});

// Exporter la fonction db()
module.exports = { connection };