const { connection } = require("../../database/database.config");

// La création de la table client
const client = connection.query(
          `CREATE TABLE IF NOT EXISTS client(
            id INTEGER AUTO_INCREMENT,
            nom VARCHAR(125) NOT NULL,
            postnom VARCHAR(125) NOT NULL,
            prenom VARCHAR(125) DEFAULT NULL,
            genre VARCHAR(15) DEFAULT NULL,
            email VARCHAR(125) NOT NULL,
            phone VARCHAR(15) DEFAULT NULL,
            adresse VARCHAR(255) DEFAULT NULL,
            PRIMARY KEY(id)
        )`,
          (err, result) => {
            if (err) console.log(err);
            console.log(`La création de la table client est effectuée avec succès !`);
          }
        );

module.exports = {client};