const fs = require('node:fs');
const path = require('node:path');

const filePath = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(filePath, { flags: 'a' });

const readline = require('readline');

console.log('Enter text (or type \'exit\' to exit):');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (input) => {
  if (input.trim() === 'exit') {
    console.log('Goodbye!');
    rl.close();
    writeStream.end(); // Закрываем запись
    return; // Выходим, чтобы не пытаться записать после закрытия
  }
  writeStream.write(input + '\n');
});

rl.on('close', () => {
  console.log('Exiting the program');
});

process.on('SIGINT', () => {
  console.log('Goodbye!');
  rl.close();
  writeStream.end();
  process.exit();
});
