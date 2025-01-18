const fs = require('fs/promises');
const path = require('path');

async function readSecretFolder() {
  const folderPath = path.join(__dirname, 'secret-folder');
  const files = await fs.readdir(folderPath, { withFileTypes: true });

  for (const file of files) {
    if (file.isFile()) {
      const filePath = path.join(folderPath, file.name);
      const stats = await fs.stat(filePath);
      const fileSize = stats.size;
      const fileExtension = path.extname(file.name).slice(1); // Расширение без точки
      const fileName = path.basename(file.name, path.extname(file.name));
      console.log(`${fileName} - ${fileExtension} - ${fileSize}bytes`);
    }
  }
}

readSecretFolder().catch(console.error);
