const mysql = require('mysql');
const http = require('http');

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
        http.createServer((req, res) => {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            const resultString = results.map(row => ` ${row.id_no}: ${row.name} ${row.department} ${row.designation}`).join('\n');
            res.end('results: ' + resultString);
        }).listen(3000, 'localhost', () => {
            console.log('Server running on http://localhost:3000');
        }
        );
        connection.end((err) => {
            if (err) {
                console.error('Error closing connection: ' + err.stack);
                return;
            }
            console.log('Connection closed');
        });
    });
});