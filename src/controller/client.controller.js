const { create } = require("../middleware/auth.middleware");
const { parseJson } = require("../middleware/transformer.middleware");
const { sendResponse } = require("../services/http-response-management.service");

const clientController = (req, res) =>{
    const url = req.url;
  const method = req.method;

  // Définition des routes
  switch (url) {
    case "/api/magasin/clients":
      switch (method) {
        case "POST":
          parseJson(req, res);
          create(req, res);
          break;
        default:
          sendResponse(res, 404, { code: 404, message: `Méthode non définie !` });
          break;
      }
      break;
    default:
      sendResponse(res, 404, { code: 404, message: "Route non trouvée !" });
      break;
  }
}

module.exports = {clientController};