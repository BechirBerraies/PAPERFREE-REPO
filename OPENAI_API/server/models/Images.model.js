const mongoose = require('mongoose');


StudentSchema = new mongoose.Schema({
    
    IdCardImage: {
        type : String ,
        required:[true,"YOU MUST HAVE A NAME"]
    },
    PassePortImage: {
        type: String,
        required:[true, "Input Your SURNAME "]
    },
    PassePortImage:{
        type: Number,
        required:[true, "Input your Id Number"]
    }
    


},{ timestamps: true });