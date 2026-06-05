const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee'
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed ');
        return;
    }
console.log('Connected to MySQL server.');

const sql = 'DELETE from emp_table where designation = "Research"';
const data = [];

connection.query(sql,data,(err,results)=>{
    if(err){
        return console.error('Insert error:',err.message);
    }
    console.log('Rows affected:',results.affectedRows);
});
 connection.end();
});