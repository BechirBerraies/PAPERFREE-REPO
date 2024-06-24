const CardId = require('../models/CardId.model');


module.exports={

    CreateCard:(req,res)=>{
        CardId.create(req.body)
        .then(res => res.status(201).json(response))
        .catch(err => console.log(err), res.status(400).json(error.errors))
    } ,
    

}