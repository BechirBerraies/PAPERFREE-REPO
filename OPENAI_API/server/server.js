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
    res.json({ success: true, imagePath: `http://localhost:${PORT}/${imagePath}` });
    console.log("🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤"+imagePath);
});

app.post('/askchatgpt', async (req, res) => {
    try {
        const { name, surname, id, imagePath } = req.body;
        console.log("🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️"+imagePath);
        // Extract text from image using Python script
        const pythonProcess = spawn('python', ['ocr.py', imagePath]);

        let extractedText = '';

        pythonProcess.stdout.on('data', (data) => {
            extractedText += data.toString();
        });

        const extractedTextString = extractedText.toString('utf-8');

        // Print the extracted text
        console.log('Extracted text:', extractedTextString);


        pythonProcess.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        pythonProcess.on('close', async (code) => {
            if (code !== 0) {
                return res.status(500).json({ error: 'Failed to process image with OCR' });
            }

            try {
                const completion = await openai.chat.completions.create({
                    model: 'gpt-4-1106-preview',
                    messages: [
                        {
                            role: 'system',
                            content: `You are a document comparator. Verify if the data provided matches the data extracted from extractedText.`,
                        },
                        {
                            role: 'user',
                            content: JSON.stringify({ name, surname, id, extractedText }),
                        },
                    ],
                });

                const response = completion.choices[0].message.content;
                console.log(response);

                res.json(response);
            } catch (error) {
                console.error('Error with OpenAI API:', error);
                res.status(500).json({ error: 'Error processing request with OpenAI' });
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
});