const user = {
  name: "Sonal",
  age: 25,
  skills: ["Node.js", "React", "MongoDB"]
};

const jsonString = JSON.parse(JSON.stringify(user)); 
console.log(jsonString);
