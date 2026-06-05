let user = {
    name: "John Doe",
    age: 30,
    email: "john@example.com",
    skills: ["JavaScript", "Node.js", "MongoDB"],
    isActive: true
};
const userData = JSON.parse(JSON.stringify(user));
console.log(userData.name);
console.log(userData.skills);

const book = {
title: "arjuna's dilemma",
genre: "Fiction",
type: "Children",
pages: 56
};

// Convert object to JSON string with indentation
const jsonData = JSON.parse(JSON.stringify(book));
console.log(jsonData);
console.log(jsonData.title); // Output: Ali goes to school