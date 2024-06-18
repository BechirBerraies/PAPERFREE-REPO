const UPLOADController =require('../controllers/upload.controller');



module.exports= app=>  {

    app.post("/uploadimage" , UPLOADController.uploadimage)
    
}