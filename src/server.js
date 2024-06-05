const http = require('http');
const { clientController } = require('./controller/client.controller');
const { client } = require('./models/client.model');
const { user } = require('./models/user.model');
const { userController } = require('./controller/user.controller');

const serveur = http.createServer((req, res) =>{
  //Création des tables
  client;
  user;

  const url = req.url;
  
  //Définition des routes
  switch (url) {
    case "/api/magasin":
      salon(req, res);
      break;
    case "/api/magasin/clients":
      clientController(req, res);
      break;
    case "/api/magasin/users/login":
      userController(req, res);
      break;
    case "/api/magasin/users":
      userController(req, res);
      break;
    default:
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain");
      res.end(JSON.stringify({ code: 404, message: "Route non trouvée !" }));
      break;
  }
});

const salon = (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end(JSON.stringify({ code: 200, message: `Soyez les bienvenues à l'API de gestion d'un magasin !` }));
}

const port = process.env.PORT || 5500
const hostName = process.env.HOST_NAME || "localhost"
serveur.listen(port, hostName, () => {
    console.log(`server listening...  on ${hostName}:${port}`);
});