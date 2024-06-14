const mongoose = require('mongoose');


StudentSchema = new mongoose.Schema({
   
    Name: {
        type : String ,
        required:[true,"YOU MUST HAVE A NAME"]
    },
    Surname: {
        type: String,
        required:[true, "Input Your SURNAME "]
    },
    IdCardNumber:{
        type: Number,
        required:[true, "Input your Id Number"]
    }
    


},{ timestamps: true });