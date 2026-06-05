const mysql = require('mysql');
 
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee'
});
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database with thread id: ' + connection.threadId);
        connection.query('SELECT id_no,name,department,designation From emp_table', (err, results) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            return;
        }
        console.log('Results: ', results);
        connection.end((err) => {
            if (err) {
                console.error('Error closing connection: ' + err.stack);
                return;
            }
            console.log('Connection closed');
        });
    });
});