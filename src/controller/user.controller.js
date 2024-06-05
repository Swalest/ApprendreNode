const { login, authenticate, findConnectedUSer } = require("../middleware/auth.middleware");

const userController = (req, res) =>{
    const url = req.url;
    const method = req.method;

    // Définition des routes
    switch (url) {
        case "/api/magasin/users/login":
            switch (method) {
                case "POST":
                    login(req, res);
                    break;
                default:
                    res.statusCode = 404;
                    res.setHeader("Content-Type", "text/plain");
                    res.end(JSON.stringify({ code: 404, message: "Méthode non définie !" }));
                    break;
            }
            break;
        case "/api/magasin/users":
            switch (method) {
                case "GET":
                    authenticate(req, res);
                    findConnectedUSer(req, res);
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

module.exports = {userController};