const UPLOADController =require('../controllers/upload.controller');



module.exports= app=>  {

    app.post("/openaiIdCard" , UPLOADController.uploadid)


}