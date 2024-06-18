const multer = require('multer');
const { spawn } = require('child_process');

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

// Exporting module
module.exports = {
    uploadimage: (req, res) => {
        // Using upload middleware here to handle the file upload
        upload.single('file')(req, res, (err) => {
            if (err) {
                return res.status(400).json({ success: false, error: err.message });
            }
            if (!req.file) {
                return res.status(400).json({ success: false, error: 'No file uploaded' });
            }
            const imagePath = req.file.path;
            console.log("Uploaded image path:", imagePath);
            // Call talkToPython function with imagePath and res
            talkToPython(imagePath, res);
        });
    }
};

// Function to communicate with Python script
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
            res.send({ success: true, imagePath, scriptOutput });
        } else {
            res.status(500).send(`Python script exited with code ${code}`);
        }
    });
}