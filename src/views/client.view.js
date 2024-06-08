const { connection } = require("../../database/database.config");
const { sendResponse } = require("../services/http-response-management.service");

const findOne = async (req, res) =>{
    req.on("end", async () =>{
        //try{
            const {id} = req.body;
            console.log(id)
            connection.query(
                `SELECT client.id, nom, postnom, prenom, genre, client.email, phone, adresse
                 FROM client
                  WHERE id = ?`, [id], 
                (err, result)=>{
                    if(err) {
                        sendResponse(res, 404, { code: 404, message: "Ce client n'existe pas encore !" });
                      }else{
                        sendResponse(res, 200, {...result[0]});
                      }
                });
        //}catch(err){
          //  sendResponse(res, 409, {cpde: 409, message: `Une erreur est survenue lors de la récupération de client !`})
        //}
    });
}

module.exports = {findOne}