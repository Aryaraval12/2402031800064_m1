const fs = require('fs');
 async function writeFileexample() {
    try {
        await fs.writeFile('example.txt', 'Hello, this is an example of writing to a file using fs module in Node.js!', 'utf8');
        console.log('File written successfully!');
    } catch (err) {
        console.error('Error writing file:', err);
    }
}
writeFileexample();