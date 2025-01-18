const fs = require('fs/promises');
const path = require('path');

const srcFolder = path.join(__dirname, 'files');
const outputFolder = path.join(__dirname, 'files-copy');

async function copyFiles(src, dest) {
  // Создаем папку, если ее нет
  await fs.mkdir(dest, { recursive: true });

  const files = await fs.readdir(src, { withFileTypes: true });

  for (const file of files) {
    const srcPath = path.join(src, file.name);
    const destPath = path.join(dest, file.name);
    if (file.isDirectory()) {
      // Если это папка, копируем ее рекурсивно
      await copyFiles(srcPath, destPath);
    } else {
      // Если файл, копируем его
      await fs.copyFile(srcPath, destPath);
    }
  }
}

async function removeFiles(src, dest) {
  const destFiles = await fs.readdir(dest, { withFileTypes: true });
  for (const file of destFiles) {
    const destPath = path.join(dest, file.name);
    const srcPath = path.join(src, file.name);
    if (!(await fs.stat(srcPath).catch(() => false))) {
      // Если файла нет в files, удаляем
      await fs.rm(destPath, { recursive: true, force: true });
    }
  }
}

async function copyDirectory(src, dest) {
  await copyFiles(src, dest);
  await removeFiles(src, dest);
}

copyDirectory(srcFolder, outputFolder)
  .then(() => console.log('Copying completed!'))
  .catch((err) => console.error('Error during copying:', err));
