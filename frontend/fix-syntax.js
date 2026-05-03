const fs = require('fs');

const files = [
  'src/features/guard/screens/HomeScreen.tsx',
  'src/features/guard/screens/GuideScreen.tsx',
  'src/features/guard/screens/PreventionScreen.tsx'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    
    // Fix the syntax error:
    // import {
    // import { C, FONTS ...
    content = content.replace(/import\s*\{\s*import\s*\{\s*C,\s*FONTS.*?\n/g, 'import {\n');
    content = content.replace(/import\s*\{\s*import\s*\{\s*C.*?\n/g, 'import {\n');
    
    fs.writeFileSync(f, content);
  }
});
console.log('Fixed syntax in files');
