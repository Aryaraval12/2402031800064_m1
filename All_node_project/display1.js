const express = require('express');
const mongoclient = require('mongodb').MongoClient;
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const url = 'mongodb://localhost:27017';
const client = new mongoclient(url);
const dbName = 'studentdb';
let db, students;

async function connectDB() {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db(dbName);
    students = db.collection('stu_table');
}
connectDB();

app.post('/students', async (req, res) => {
    const result = await students.insertOne(req.body);
    res.json(result);
});

app.get('/students', async (req, res) => {
    const result = await students.find().toArray();
    res.json(result);
});

app.get('/students/:id', async (req, res) => {
    const result = await students.findOne({ _id: new ObjectId(req.params.id) });
    res.json(result);
});

app.put('/students/:id', async (req, res) => {
    const result = await students.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
    );
    res.json(result);
});

app.delete('/students/:id', async (req, res) => {
    const result = await students.deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(result);
});
