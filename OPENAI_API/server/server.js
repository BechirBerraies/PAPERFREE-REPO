const express = require('express');
const multer = require('multer');
const { spawn } = require('child_process');
const fs = require('fs');
const OpenAI = require('openai');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = 8000;

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
});

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, error: 'No file uploaded' });
    }
    const imagePath = req.file.path;
    
    console.log("🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤"+imagePath);
    talkToPython(imagePath, res)
});

function talkToPython(imagePath, res) {
    const pythonProcess = spawn('python', ['./ocr.py', imagePath], {
        env: { ...process.env, PYTHONIOENCODING: 'utf-8' }
    });
  
    let scriptOutput = '';

    pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        scriptOutput += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error from Python script: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`Python process closed with code ${code}`);
        if (code === 0) {
            console.log("this is the response PATH " + imagePath);
            res.send({success: true,imagePath,scriptOutput});
        } else {
            res.status(500).send(`Python script exited with code ${code}`);
        }
    });
}

app.post('/askchatgpt', async (req, res) => {
    try {
        const { name, surname, id, arabicText } = req.body;

        if (!name || !surname || !id || !arabicText) {
            return res.status(400).json({ error: 'All fields (name, surname, id, scriptOutput) are required.' });
        }

        console.log("🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️" + arabicText);

        try {
            const completion = await openai.chat.completions.create({
                model: 'gpt-4-1106-preview',
                messages: [
                    {
                        role: 'system',
                        content: `You are a document comparator. 
                        Compare the provided data (name, surname, id) with the arabicText and return the result in JSON format.
                        The arabicText is obtained from an OCR process that may have inaccuracies.
                        The JSON should include:
                        1. "name_match": a boolean indicating if the name matches.
                        2. "surname_match": a boolean indicating if the surname matches.
                        3. "id_match": a boolean indicating if the id matches.
                        4. "accuracy": a percentage representing the overall accuracy of the comparison, considering potential OCR errors.
                        5. "notes": additional notes about the comparison and any potential ambiguities.`
                    },
                    {
                        role: 'user',
                        content: JSON.stringify({ name, surname, id, arabicText }),
                    },
                ],
            });

            const response = completion.choices[0].message.content;
            console.log(response);

            res.json({ response });
        } catch (error) {
            console.error('Error with OpenAI API:', error);
            res.status(500).json({ error: 'Error processing request with OpenAI' });
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Unexpected server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
});