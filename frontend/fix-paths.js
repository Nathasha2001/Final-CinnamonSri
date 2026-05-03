const fs = require('fs');
const path = require('path');

const guardDir = path.join(__dirname, 'src/features/guard');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(guardDir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace @/ imports
  content = content.replace(/@\//g, (match, offset, string) => {
    // Determine depth relative to guardDir
    const relPath = path.relative(path.dirname(file), guardDir);
    // relPath is empty if in guardDir, ".." if in guardDir/screens, etc.
    let prefix = relPath;
    if (prefix === '') prefix = '.';
    return prefix + '/';
  });

  fs.writeFileSync(file, content);
});
console.log('Fixed paths');
