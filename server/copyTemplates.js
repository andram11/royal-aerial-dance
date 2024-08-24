// copyTemplates.js
const fs = require('fs');
const path = require('path');

// Define source and destination directories
const sourceDir = path.join(__dirname, 'services/email/templates');
const destDir = path.join(__dirname, 'dist/services/email/templates');

// Function to copy .handlebars files
function copyHandlebarsFiles(src, dest) {
  // Read the directory contents
  fs.readdirSync(src, { withFileTypes: true }).forEach((dirent) => {
    const srcPath = path.join(src, dirent.name);
    const destPath = path.join(dest, dirent.name);

    if (dirent.isDirectory()) {
      // Recursively copy directories
      fs.mkdirSync(destPath, { recursive: true });
      copyHandlebarsFiles(srcPath, destPath);
    } else if (dirent.isFile() && dirent.name.endsWith('.handlebars')) {
      // Copy .handlebars files
      fs.copyFileSync(srcPath, destPath);
      //console.log(`Copied: ${srcPath} -> ${destPath}`);
    }
  });
}

// Create destination directory if it doesn't exist
fs.mkdirSync(destDir, { recursive: true });

// Start copying files
copyHandlebarsFiles(sourceDir, destDir);

//console.log('Template copy completed!');
