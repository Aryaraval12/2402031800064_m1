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
  database: 'employee'
});
 
connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    return;
  }
  console.log('Connected to MySQL server.');
});
// insert record api
app.post("/api/insert", (req, res) => {
  const { name, department, designation } = req.body;
 
  const sql = `
    INSERT INTO emp_table (name, department, designation) VALUES (?, ?, ?)`;
    connection.query(sql, [name, department, designation], (err, result) => {
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
// display record api
app.get('/api/employees', (req, res) => {
    connection.query('SELECT * FROM emp_table', (err, results) => {
        if (err) 
           throw err;
        res.json(results);
        
    });
});
// delete record api
app.delete('/api/employees/:name', (req, res) => {
    const employeeName = req.params.name;
    connection.query('DELETE FROM emp_table WHERE name = ?', [employeeName], (err, result) => {
        if (err) {
            console.error('Delete error:', err.message);
            return res.status(500).send({ message: "Delete failed" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: "Employee not found" });
        } 
        res.send({ message: "Employee deleted successfully" });
    });
});
// update record api
app.put('/api/employees/:id', (req, res) => {
    const employeeId = req.params.id;
    const { name, department, designation } = req.body;
    connection.query('UPDATE emp_table SET name = ?, department = ?, designation = ? WHERE id_no = ?', [name, department, designation, employeeId], (err, result) => {
        if (err) {
            console.error('Update error:', err.message);  
            return res.status(500).send({ message: "Update failed" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: "Employee not found" });
        }
        res.send({ message: "Employee updated successfully" });
    });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});