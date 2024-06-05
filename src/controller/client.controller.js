const { create } = require("../middleware/auth.middleware");

const clientController = (req, res) =>{
    const url = req.url;
  const method = req.method;

  // Définition des routes
  switch (url) {
    case "/api/magasin/clients":
      switch (method) {
        case "POST":
          create(req, res);
          break;
        default:
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/plain");
          res.end(JSON.stringify({ code: 404, message: "Méthode non définie !" }));
          break;
      }
      break;
    default:
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain");
      res.end(JSON.stringify({ code: 404, message: "Route non trouvée !" }));
      break;
  }
}

module.exports = {clientController};