const { connection } = require("../../database/database.config");
const { sendResponse } = require("../services/http-response-management.service")
const bcrypt = require('bcrypt');

const create = (req, res)=>{
    try{
        req.on('end', ()=>{
            const {role, email, password } = req.body;
            connection.query(`SELECT * FROM user WHERE email = ?`, [email], (erreur, resultat)=>{
                if(erreur){
                    connection.query(`INSERT INTO user `, )
                }else{
                    sendResponse(res, 409, {code: 409, message: `Un autre compte existe déjà avec cette adresse mail !`});
                }
            });
        });
    }catch(erreur){
        sendResponse(res, 409, {code: 409, message: `Une erreur est survenue lors de l'enregistrement de cet utilisateur`});
    }
}