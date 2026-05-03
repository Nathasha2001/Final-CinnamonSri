const fs = require('fs');

let c = fs.readFileSync('src/features/guard/screens/DetectionScreen.tsx', 'utf8');
c = c.replace(/router\.push\(\{\s*pathname:\s*['"]\/prevention['"],\s*params:\s*\{(.*?)\}\s*,?\s*\}\)/s, "navigation.navigate('Prevention', {$1})");
fs.writeFileSync('src/features/guard/screens/DetectionScreen.tsx', c);
console.log('Fixed DetectionScreen');
