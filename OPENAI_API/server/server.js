const express = require('express');
const multer = require('multer');
const { spawn } = require('child_process');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookies = require('cookie-parser')
require('dotenv').config();

const app = express();
const PORT = 8000;
DB = process.env.DB;
app.use(express.json(), cookies(),bodyParser.json()
,express.urlencoded({ extended: true }),cors({credentials:true, origin:"http://localhost:5173"}));






require('./config/configs.mongoose')(DB)
require('./routes/openai.routes')(app)
require('./routes/upload.routes')(app)
require('./routes/student.routes')(app)



app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
});