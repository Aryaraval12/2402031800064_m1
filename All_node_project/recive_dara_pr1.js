const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();

app.use(cors());
app.use(express.json());
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'school'
});
 
connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    return;
  }
  console.log('Connected to MySQL server.');
});
app.post("/api/insertrecord", (req, res) => {
  const { name, stream, divison } = req.body;
 
  const sql = `
    INSERT INTO student (name, stream, division) VALUES (?, ?, ?)`;
    connection.query(sql, [name, stream, divison], (err, result) => {
    if (err) {
      console.error('Insert error:', err.message);
      return res.status(500).send({ message: "Insert failed" });
    }
    res.send({
      message: "Record inserted successfully",
      id: result.insertId
    });
  });
});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});