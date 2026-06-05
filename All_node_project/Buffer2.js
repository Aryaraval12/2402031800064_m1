const buf = Buffer.alloc(5);

buf.write('Hi!!');
console.log(buf.toString());

console.log(buf[0]);
console.log(buf[1]);
console.log(buf[2]);
console.log(buf[3]);