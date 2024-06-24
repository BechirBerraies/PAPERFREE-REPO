const CardIdController =require('../controllers/CardId.controller');



module.exports= app=>  {

    app.post("/createCard" , CardIdController.CreateCard)

}