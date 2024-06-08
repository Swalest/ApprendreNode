const { connection } = require("../../database/database.config");

// La création de la table client
const produit = connection.query(
          `CREATE TABLE IF NOT EXISTS produit(
            id INTEGER AUTO_INCREMENT,
            denomination VARCHAR(255) NOT NULL,
            marge_beneficiaire FLOAT DEFAULT 20,
            PRIMARY KEY(id)
        )`,
          (err, result) => {
            if(err) console.log(err);
            else console.log(`La création de la table produit est effectuée avec succès !`);
          }
        );

module.exports = {produit};