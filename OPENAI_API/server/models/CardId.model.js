const mongoose = require('mongoose');

const CardIdSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, "YOU MUST HAVE A NAME"]
    },
    Surname: {
        type: String,
        required: [true, "YOU MUST HAVE A SURNAME"]
    },
    BirthDate: {
        type: Date,
        required: [true, "Birthdate is required"]
    },
    path: {
        type: String,
        required: [true, "Image path is required"]
    },
    CardNumber: {
        type: String,
        required: [true, "Card number is required"]
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    }
}, { timestamps: true });

const CardId = mongoose.model("CardId", CardIdSchema);
module.exports = CardId;