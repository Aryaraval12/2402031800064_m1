const fs = require('fs');
 
const data = fs.readFileSync('data.json', 'utf8');

const course = JSON.parse(data);
console.log(course);
// map through the courses and print the name and skills
// loop through the courses and print the name and skills
course.forEach(course => {
    console.log(`Course Name: ${course.name}`);
    console.log(`Skills: ${course.skills.join(', ')}`);
    console.log('-------------------------');
});

 