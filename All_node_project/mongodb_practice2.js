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
    const sanitizedName = file.originalname.replace(/\s+/g, '_');
    cb(null, `${uniqueSuffix}-${sanitizedName}`);
  },
});
const upload = multer({ storage ,
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

app.post('/photo', upload.single('image'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });  
    res.json({
        message: 'Image uploaded successfully',
        filename: req.file.filename,
        path: req.file.path
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
  // add the images to the mongodb studentdb -> stu_table collection
  const url = "mongodb://localhost:27017";
  const client = new MongoClient(url);
  const dbName = "Studentdb";
  
  let db, employees;
  
  async function connectDB() {
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db(dbName);
    studs = db.collection("imagetab");
    const result = await studs.insertOne({
        filename: req.file.filename,
        path: req.file.path
    });
    console.log("Inserted id:", result.insertedId);
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});