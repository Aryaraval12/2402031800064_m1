const path = require('path');
 
const filePath = '/users/sonal/docs/file.txt';
 
console.log(path.basename(filePath)); 
console.log(path.dirname(filePath));  
console.log(path.extname(filePath));  
console.log(path.join('/users', 'sonal', 'docs', 'file.txt')); 