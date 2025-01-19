const fs = require('fs');
const path = require('path');

async function mergeStyles() {
  const allStyles = path.join(__dirname, 'styles');
  const outputStyles = path.join(__dirname, 'project-dist', 'bundle.css');

  // Если bundle.css существует, удаляем,чтобы перезаписать
  if (fs.existsSync(outputStyles)) {
    fs.unlinkSync(outputStyles);
  }

  const files = await fs.promises.readdir(allStyles, { withFileTypes: true });

  const styles = [];

  for (const file of files) {
    if (file.isFile() && path.extname(file.name) === '.css') {
      const filePath = path.join(allStyles, file.name);
      const cssContent = await fs.promises.readFile(filePath, 'utf-8');
      styles.push(cssContent);
    }
  }

  await fs.promises.writeFile(outputStyles, styles.join('\n'));
}

mergeStyles()
  .then(() => console.log('Styles successfully merged into bundle.css'))
  .catch((err) => console.error('Error merging styles:', err));
