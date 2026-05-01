const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'screens', 'CinnOracle', 'screens');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

// Add components folder too
const compDir = path.join(__dirname, 'src', 'screens', 'CinnOracle', 'components');
const compFiles = fs.readdirSync(compDir).filter(f => f.endsWith('.tsx'));

const processFile = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 1. Specific backgrounds
  content = content.replace(/backgroundColor:\s*'#(F5F5F5|F3F4F6|FAFAFA|E8F5E9|F1F8E9|E0F2F1)'/gi, "backgroundColor: '#FFFFFF'");
  
  // 2. Button or badge backgrounds that were green
  content = content.replace(/backgroundColor:\s*'#(1B4332|0B5E2D|2E7D32|27ae60|4CAF50|047857|064E3B|10B981|081C15)'/gi, "backgroundColor: '#D47024'");
  
  // 3. Text colors that were green (headers, etc.)
  content = content.replace(/color:\s*'#(1B4332|0B5E2D|2E7D32|27ae60|047857|064E3B)'/gi, "color: '#D47024'");
  
  // 4. Icon colors or any other generic green hexes
  content = content.replace(/#(1B4332|0B5E2D|2E7D32|27ae60|4CAF50|047857|064E3B|10B981|081C15)/gi, '#D47024');

  // 5. Borders that were light grey/green
  content = content.replace(/borderColor:\s*'#(E5E7EB|E0E0E0)'/gi, "borderColor: '#F4EAE4'");
  
  // 6. Old Dark text colors to Coffee
  content = content.replace(/#(111827|1E1E1E|212121)/gi, '#2B1D16');
  
  // 7. Old Muted text colors
  content = content.replace(/#(4B5563|757575)/gi, '#8D7B70');

  fs.writeFileSync(filePath, content);
};

files.forEach(f => processFile(path.join(dir, f)));
compFiles.forEach(f => processFile(path.join(compDir, f)));

console.log('Replacement complete.');
