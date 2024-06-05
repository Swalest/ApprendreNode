const { connection } = require("../../database/database.config");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendResponse } = require("../services/http-response-management.service");

const create = (req, res) => {

  req.on("end", async () => {
      const { nom, postnom, prenom, genre, email, phone, adresse, password } = req.body;

      try {
      // Insérer le client
      await connection.query(
          'INSERT INTO client(nom, postnom, prenom, genre, email, phone, adresse) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [nom, postnom, prenom, genre, email, phone, adresse],
          async (err, result) => {
            if(err) {
              sendResponse(res, 409,
                { code: 409, message: "L'enregistrement de ce client a échoué !", err });
              
            }else{
              const clientId = result.insertId;

              //Génération de salt
              const salt = await bcrypt.genSalt();
  
              //Hashage de mot de passe
              const hashedPassword = await bcrypt.hash(password, salt);

            // Insérer l'utilisateur
            await connection.query(
                'INSERT INTO user (clientId, email, salt, password) VALUES (?, ?, ?, ?)',
                [clientId, email, salt, hashedPassword],
                (err, result) => {
                  if(err) {
                    sendResponse(res, 409,
                      { code: 409, message: "La création de compte de ce client a échoué !", err });
                
                  }else{
                    sendResponse(res, 200, 
                      {id: clientId, nom, postnom, prenom, genre, email, phone, adresse, user:{id: result.insertId, email, clientId}}
                    );
                    
                  }
                });
                }
          });
      
      } catch (err) {
        sendResponse(res, 409,
          { code: 409, message: "L'enregistrement de ce client a échoué !", err }
        );
          
     }
  })
}


const login = async (req, res) => {
    try {

      req.on("end", async () => {
        const { email, password } = req.body;
        try {
          connection.query(`SELECT * FROM user WHERE email = ?`, [email], (err, userResult) => {
            if(err) {
              sendResponse(res, 404,{ code: 404, message: "Cet utilisateur n'existe pas encore !" });
            } else {
              try{
                connection.query(`SELECT * FROM client WHERE id = ?`, [userResult[0].clientId], (err, clientResult) => {
                  if(err) {
                    sendResponse(res, 404, { code: 404, message: "Ce client n'existe pas encore !" });
                  }else {

                    // Vérifier le mot de passe
                    const isPasswordValid = bcrypt.compare(password, userResult[0].password);
                    if(!isPasswordValid){
                      sendResponse(res, 401, { code: 401, message: "Mot de passe est incorrect !" });
                    }
                      
                    //formation des information à injecter dans le token
                    const userId = userResult[0].id;
                    const clientId = userResult[0].clientId;
                    const clientName = `${clientResult[0].prenom} ${clientResult[0].nom} ${clientResult[0].postnom}`;
                    const userInfo = {userId, ...clientResult[0]};
                    const data = {userId, clientId, clientName};

                    // Générer un jeton d'authentification (exemple: JWT)
                    const token = generateAuthToken(data);
                    const returnData = {userInfo: userInfo, token: token};
                    sendResponse(res, 200, returnData);
                  }
                })
              }catch (erreur) {
                sendResponse(res, 404, { code: 404, message: "Ce client n'existe pas encore !" });
                
              }
            }
          });
        } catch (erreur) {
          sendResponse(res, 404, { code: 404, message: "Cet utilisateur n'existe pas encore !" });
          
        }
      })
    }catch(erreur){
      sendResponse(res, 401, { code: 401, message: "Une erreur est survenue lors de votre authentification !" });

    }
}
  
  // Fonction pour générer un jeton d'authentification (exemple: JWT)
const generateAuthToken = (data) => {
  
  const {userId, clientId, clientName} = data;
  const user = {"userId": userId, "clientId": clientId,"clientName": clientName};

  // Générer le jeton avec les informations utilisateur et la clé secrète
  const token = jwt.sign(user, process.env.SECRET_KEY);
  return token;
}
  
  // Fonction middleware pour vérifier l'authentification
const authenticate = (req, res, next) => {
  
     //Récupérer le jeton d'authentification du header, du corps de la requête ou des cookies
     const token = req.headers.authorization?.split(' ')[1] || req.body.token || req.cookies.token;
  
     if(!token) {
      sendResponse(res, 401, { code: 401, message: `Aucun jeton d'authentification fourni !` });
      
     }
   
     try {
       //Vérifier et décoder le jeton
       const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
   
       //Ajouter les informations utilisateur au corps de la requête
       req.user = decodedToken;
       next;
     } catch (error) {
      sendResponse(res, 401, { code: 401, message: `Unauthorized !` });
     }
    next;
  }

const findConnectedUSer = async (req, res)=>{
  const {userId, clientId} = req.user;
  try{
    await connection.query(`SELECT * FROM user WHERE id = ?`, [userId], (err, userResult) => {
      if(err) {
        sendResponse(res, 404, { code: 404, message: "Cet utilisateur n'existe pas encore !" });
        
      }else{
        connection.query(`SELECT * FROM client WHERE id = ?`, [clientId], (err, clientResult) => {
          if(err) {
            sendResponse(res, 404, { code: 404, message: "Ce client n'existe pas encore !" });
          }else{
            sendResponse(res, 200, {...userResult[0], client: clientResult[0]});
          }
        });
      }
    });
  }catch (error) {
    sendResponse(res, 404, 
      { code: 404, message: `Une erreur est survenue lors de la récupération d'utilisateur connecté !` }
    );
  }
}

module.exports = {create, login, authenticate, findConnectedUSer};