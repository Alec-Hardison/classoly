const fs = require('fs');

let sts = [];
fs.readFile('events.json', async (err, data) => {
sts = await JSON.parse(data);
console.log(sts
.filter(st => st['Event'].length < 7)
.map(st => st['Per_Grade'])
//.length
)
})