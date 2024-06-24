const mongoose = require('mongoose');
const Student = require('./Student.model');

CardIdSchema = new mongoose.Schema({
   
    Name: {
        type : String ,
        required:[true,"YOU MUST HAVE A NAME"]
    },
    Surname :{
        type : String ,
        required:[true,"YOU MUST HAVE A NAME"]
    },
    BirthDate:{
        type : Date,
        require:[true,"How old are you "]
    },
    path: {
        type: String,
        required:[true]
    },
    CardNumber:{
        type:Date,
        required:[true]
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    }



},{ timestamps: true });


const CardId = mongoose.model("CardId",CardIdSchema);
module.exports= {CardId, CardIdSchema}
