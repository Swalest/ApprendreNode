const http = require('http');
const { clientController } = require('./controller/client.controller');
const { client } = require('./models/client.model');
const { user } = require('./models/user.model');
const { userController } = require('./controller/user.controller');
const { sendResponse } = require('./services/http-response-management.service');

const serveur = http.createServer((req, res) =>{
  //Création des tables
  client;
  user;

  const url = req.url;
  
  //Définition des routes
  if(url === "/api/magasin"){
    home(req, res);
  }else if(url.startsWith("/api/magasin/clients")){
    clientController(req, res);
  }else if(url.startsWith("/api/magasin/users")){
    userController(req, res);
  }else{
    sendResponse(res, 404, { code: 404, message: `Route non trouvée !` });
  }
});
const home = (req, res) => {
  sendResponse(res, 200, 
    { code: 200, message: `Soyez les bienvenues à l'API de gestion d'un magasin !` });
}

const port = process.env.PORT || 5500
const hostName = process.env.HOST_NAME || "localhost"
serveur.listen(port, hostName, () => {
    console.log(`server listening...  on ${hostName}:${port}`);
});