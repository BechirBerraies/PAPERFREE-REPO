const express = require('express');
const multer = require('multer');
const { spawn } = require('child_process');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = 8000;
DB = process.env.DB;




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




require('./config/configs.mongoose')(DB)
require('./routes/openai.routes')(app)


app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
});