const fs = require('node:fs');
const path = require('node:path');

const filePath = path.join((__dirname, 'text.txt'), 'utf-8');
const readStream = fs.createReadStream(filePath);

readStream.on('data', (chunk) => {
  console.log(chunk.toString());
});

readStream.on('error', (err) => {
  console.error('Error reading the file:', err);
});
