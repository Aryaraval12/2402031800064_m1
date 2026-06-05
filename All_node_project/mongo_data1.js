const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "employeedb";

let db, employees;

async function connectDB() {
  await client.connect();
  console.log("Connected to MongoDB");
  db = client.db(dbName);
  employees = db.collection("employees");
}

connectDB();

app.post("/employees/:id", async (req, res) => {
  const result = await employees.insertOne(req.body);
  res.json(result);
});

app.get("/employees/:id", async (req, res) => {
  const result = await employees.find().toArray();
  res.json(result);
});

app.get("/employees/:id", async (req, res) => {
  const result = await employees.findOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});

app.put("/employees/:id", async (req, res) => {
  const result = await employees.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.json(result);
});

app.delete("/employees/:id", async (req, res) => {
  const result = await employees.deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(result);
});

app.listen(5000, () => console.log("Server running on port 5000"));
