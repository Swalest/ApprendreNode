const { connection } = require("../../database/database.config");

// La création de la table client
const user = connection.query(
          `CREATE TABLE IF NOT EXISTS user(
            id INTEGER AUTO_INCREMENT,
            email VARCHAR(125) NOT NULL,
            password VARCHAR(245),
            salt VARCHAR(100),
            clientId INTEGER,
            PRIMARY KEY(id),
            FOREIGN KEY(clientId) REFERENCES client(id) ON DELETE CASCADE
        )`,
          (err, result) => {
            if (err) console.log(err);
            console.log(`La création de la table user est effectuée avec succès !`);
          }
        );

module.exports = {user};