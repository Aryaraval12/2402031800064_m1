const express = require('express');
const multer = require('multer');
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json({ limit: '5mb' }));

console.log("Server is running...");

const uploadDirectory = path.join(__dirname, 'photo');
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed'), false);
        }
        cb(null, true);
    },
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "Studentdb";

let db, employees;

async function connectDB() {
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db(dbName);
    employees = db.collection("employees");
}
connectDB();

app.post('/employees', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No image uploaded' });

        const employeeData = {
            ...req.body,
            image: {
                filename: req.file.filename,
                size: req.file.size,
                url: `/photo/${req.file.filename}`,
                uploadDate: new Date()
            }
        };

        const result = await employees.insertOne(employeeData);
        res.json({
            message: 'Employee data with image saved successfully',
            employeeId: result.insertedId,
            employeeData
        });
    } catch (error) {
        console.error('Error saving employee data with image:', error);
        res.status(500).json({ error: 'Error saving employee data with image' });
    }
});

app.get('/employees', async (req, res) => {
    try {
        const students = await employees.find().toArray();
        res.json(students);
    } catch (error) {
        console.error('Error fetching employee data:', error);
        res.status(500).json({ error: 'Error fetching employee data' });
    }
});

app.use('/photo', express.static(uploadDirectory));

app.get('/Getimages', (req, res) => {
    fs.readdir(uploadDirectory, (err, files) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Server error' });
        }
        const images = files.map(file => ({
            filename: file,
            url: `/photo/${file}`
        }));
        res.json(images);
    });
});

app.listen(5000, () => console.log("Server running on port 5000"));
