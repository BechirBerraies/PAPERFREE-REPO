const mongoose = require('mongoose');
const CardIdSchema = require('./CardId.model').schema;

const StudentSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, "YOU MUST HAVE A NAME"]
    },
    Surname: {
        type: String,
        required: [true, "Input Your SURNAME"]
    },
    email: {
        type: String,
        required: [true, "Where is your Email"],
        validate: {
            validator: val => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val),
            message: "PLEASE ENTER A VALID EMAIL"
        }
    },
    password: {
        type: String,
        required: [true, "Password very required"],
        minlength: [6, "Password too short"]
    },
    cards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CardId'
    }]
}, { timestamps: true });

const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;