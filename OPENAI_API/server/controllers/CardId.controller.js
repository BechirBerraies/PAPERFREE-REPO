const CardId = require('../models/CardId.model');
const Student = require('../models/Student.model');
const mongoose = require('mongoose');

module.exports = {
    CreateCard: async (req, res) => {
        try {
            const { student, Name, Surname, BirthDate, path, CardNumber } = req.body;
            console.log(student, "this is the Student We ARE LOOKING FOR ");
            // Ensure student is a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(student)) {
                return res.status(400).json({ error: 'Invalid student ID' });
            }

            // Check if student exists
            const studentExists = await Student.findById(student);
            if (!studentExists) {
                return res.status(404).json({ error: 'Student not found' });
            }

            // Create the CardId document
            const newCard = new CardId({
                student,
                Name,
                Surname,
                BirthDate,
                path,
                CardNumber
            });

            const savedCard = await newCard.save();
            res.status(201).json(savedCard);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};