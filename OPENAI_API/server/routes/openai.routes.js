const OPENAIController =require('../controllers/openai.controller');



module.exports= app=>  {

    app.post("/openaiIdCard" , OPENAIController.openAiIdCard)


}