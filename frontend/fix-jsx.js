const fs = require('fs');
const path = require('path');

const guardDir = path.join(__dirname, 'src/features/guard/screens');

const files = [
  'DetectionScreen.tsx',
  'ScanHistoryScreen.tsx',
  'HomeScreen.tsx',
  'GuideScreen.tsx',
  'PreventionScreen.tsx',
  'CameraScreen.tsx'
];

files.forEach(f => {
  const p = path.join(guardDir, f);
  if (fs.existsSync(p)) {
    let c = fs.readFileSync(p, 'utf8');
    
    // Fix broken imports
    c = c.replace(/import\s*\{\s*import\s*\{\s*C,\s*FONTS.*?\n/g, 'import {\n');
    c = c.replace(/import\s*\{\s*import\s*\{\s*C.*?\n/g, 'import {\n');
    
    // Fix missing braces around C.xxx in JSX props
    c = c.replace(/=(\s*)C\.spice/g, '=$1{C.spice}');
    c = c.replace(/=(\s*)C\.spiceDim/g, '=$1{C.spiceDim}');
    c = c.replace(/=(\s*)C\.bgMid/g, '=$1{C.bgMid}');
    c = c.replace(/=(\s*)C\.surface/g, '=$1{C.surface}');
    c = c.replace(/=(\s*)C\.honeyLight/g, '=$1{C.honeyLight}');
    c = c.replace(/=(\s*)C\.muted/g, '=$1{C.muted}');
    c = c.replace(/=(\s*)C\.text/g, '=$1{C.text}');
    
    // De-duplicate if it accidentally became ={{C.spice}}
    c = c.replace(/=\{\{C\.(.*?)\}\}/g, '={C.$1}');

    fs.writeFileSync(p, c);
  }
});
console.log('Fixed JSX syntax');
