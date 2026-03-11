const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.jsx')) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
};

const files = walkSync('./src/pages');
let changes = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // Replace background: 'white' with explicit text color
  content = content.replace(/background:\s*'white'/g, "background: 'white', color: '#1e293b'");
  content = content.replace(/background:\s*"white"/g, "background: 'white', color: '#1e293b'");
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    changes++;
    console.log(`Updated ${file}`);
  }
});

console.log(`Updated ${changes} files.`);
