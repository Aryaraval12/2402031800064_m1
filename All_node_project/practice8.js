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

    const newDesignation = 'Developer';
    const Name = 'arya raval';

    const updateQuery = 'UPDATE emp_table SET designation = "Junior developer" WHERE name = "arya raval"';


connection.query(updateQuery, [newDesignation, Name], (err, results) => {
    if(err){
        return console.log('updating Failed: ',err.message);
    }
        console.log(`Update successful! Rows affected: ${results.affectedRows}`);
});
 connection.end();
});