const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "Studentdb";

let db, student;

async function connectDB() {
  await client.connect();
  db = client.db(dbName);
  student = db.collection("stu_table");
//   console.log("connected to mongodb");
}
connectDB();

app.post("/insertstudent", async (req, res) => {
  const result = await student.insertOne(req.body);
  console.log("inserted id:", result.insertedId);
  res.json(result);
});

app.get("/student", async (req, res) => {
  const result = await student.find().toArray();
  res.json(result);
});

app.get("/student/:id", async (req, res) => {
  const result = await student.findOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});

app.put("/student/:id", async (req, res) => {
  const result = await student.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.json(result);
});

app.delete("/student/:id", async (req, res) => {
  const result = await student.deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});

app.listen(5000, () => console.log("Server running on port 5000"));
