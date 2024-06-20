const mongoose = require('mongoose');


CardIdSchema = new mongoose.Schema({
   
    Name: {
        type : String ,
        required:[true,"YOU MUST HAVE A NAME"]
    },
    Surname :{
        type : String ,
        required:[true,"YOU MUST HAVE A NAME"]
    },
    Age:{
        type : Number,
        require:[true,"How old are you "]
    },
    path: {
        type: String,
        required:[true]
    },



},{ timestamps: true });


const CardId = mongoose.model("Student",CardIdSchema);
module.exports= CardId