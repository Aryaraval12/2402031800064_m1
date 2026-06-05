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

const sql = 'INSERT INTO emp_table(name , department , designation) Values(? , ? , ?)';
const data = ['Tirth' , 'Salse-Man' , 'Marketing'];

connection.query(sql,data,(err,results)=>{
    if(err){
        return console.error('Insert error:',err.message);
    }
    console.log('Rows affected:',results.affectedRows);

    console.log('Generated ID:',results.insertId);
});
 connection.end();
});