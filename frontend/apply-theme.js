const fs = require('fs');
const path = require('path');

const guardDir = path.join(__dirname, 'src/features/guard/screens');

// 1. Fix DetectionScreen.tsx
const detectionPath = path.join(guardDir, 'DetectionScreen.tsx');
if (fs.existsSync(detectionPath)) {
  let content = fs.readFileSync(detectionPath, 'utf8');
  
  // Fix the missing function declaration if it exists
  if (content.includes("const [loading, setLoading] = useState(true);") && !content.includes("export default function DetectionScreen()")) {
    content = content.replace(/import\s+\{\s*C,\s*FONTS,\s*SHADOWS\s*\}\s*from\s*'\.\.\/\.\.\/drying\/src\/components\/theme';[\s\S]*?const\s+\[loading,\s*setLoading\]\s*=\s*useState\(true\);/, 
    `import { C, FONTS, SHADOWS } from '../../drying/src/components/theme';\n\nconst API_URL = "http://172.28.29.127:8000/detect";\nconst SERVER = "http://172.28.29.127:8000";\n\nexport default function DetectionScreen() {\n  const navigation = useNavigation<any>();\n  const route = useRoute<any>();\n  const params = route.params || {};\n\n  const imageUri =\n    typeof params.imageUri === "string"\n      ? params.imageUri\n      : params.imageUri?.[0];\n\n  const [loading, setLoading] = useState(true);`);
  }
  
  // Replace router.replace with navigation.navigate
  content = content.replace(/router\.replace\(['"]\/['"]\)/g, "navigation.navigate('Home')");
  
  // Apply theme colors
  content = content.replace(/"#1B4332"/g, "C.spice");
  content = content.replace(/"#2E7D32"/g, "C.spiceDim");
  content = content.replace(/"#F5F1E8"/g, "C.bgMid");
  content = content.replace(/"#ffffff"|'#ffffff'/g, "C.surface");
  
  fs.writeFileSync(detectionPath, content);
}

// 2. ScanHistoryScreen.tsx
const historyPath = path.join(guardDir, 'ScanHistoryScreen.tsx');
if (fs.existsSync(historyPath)) {
  let content = fs.readFileSync(historyPath, 'utf8');
  content = content.replace(/"#1B4332"/g, "C.spice");
  content = content.replace(/"#2E7D32"/g, "C.spiceDim");
  content = content.replace(/"#F5F1E8"/g, "C.bgMid");
  content = content.replace(/"#ffffff"|'#ffffff'/g, "C.surface");
  fs.writeFileSync(historyPath, content);
}

// 3. HomeScreen.tsx
const homePath = path.join(guardDir, 'HomeScreen.tsx');
if (fs.existsSync(homePath)) {
  let content = fs.readFileSync(homePath, 'utf8');
  content = content.replace(/"#1B4332"/g, "C.spice");
  content = content.replace(/"#2E7D32"/g, "C.spiceDim");
  content = content.replace(/"#F5F1E8"/g, "C.bgMid");
  content = content.replace(/"#ffffff"|'#ffffff'/g, "C.surface");
  // ensure it has theme imported
  if (!content.includes('import { C ')) {
    content = content.replace(/import \{.*?\} from "react-native";/s, match => match + "\nimport { C, FONTS } from '../../drying/src/components/theme';");
  }
  fs.writeFileSync(homePath, content);
}

// 4. GuideScreen.tsx
const guidePath = path.join(guardDir, 'GuideScreen.tsx');
if (fs.existsSync(guidePath)) {
  let content = fs.readFileSync(guidePath, 'utf8');
  content = content.replace(/"#1B4332"/g, "C.spice");
  content = content.replace(/"#2E7D32"/g, "C.spiceDim");
  content = content.replace(/"#F5F1E8"/g, "C.bgMid");
  content = content.replace(/"#ffffff"|'#ffffff'/g, "C.surface");
  if (!content.includes('import { C ')) {
    content = content.replace(/import \{.*?\} from "react-native";/s, match => match + "\nimport { C, FONTS } from '../../drying/src/components/theme';");
  }
  fs.writeFileSync(guidePath, content);
}

// 5. PreventionScreen.tsx
const preventionPath = path.join(guardDir, 'PreventionScreen.tsx');
if (fs.existsSync(preventionPath)) {
  let content = fs.readFileSync(preventionPath, 'utf8');
  content = content.replace(/"#1B4332"/g, "C.spice");
  content = content.replace(/"#2E7D32"/g, "C.spiceDim");
  content = content.replace(/"#F5F1E8"/g, "C.bgMid");
  content = content.replace(/"#ffffff"|'#ffffff'/g, "C.surface");
  if (!content.includes('import { C ')) {
    content = content.replace(/import \{.*?\} from "react-native";/s, match => match + "\nimport { C, FONTS } from '../../drying/src/components/theme';");
  }
  // Replace useLocalSearchParams
  content = content.replace(/const\s+params\s*=\s*useLocalSearchParams\(\);/, "const route = useRoute<any>();\n  const params = route.params || {};");
  fs.writeFileSync(preventionPath, content);
}

// 6. CameraScreen.tsx (Only button colors)
const cameraPath = path.join(guardDir, 'CameraScreen.tsx');
if (fs.existsSync(cameraPath)) {
  let content = fs.readFileSync(cameraPath, 'utf8');
  // keep background black, only change button colors
  content = content.replace(/"#2E7D32"/g, "C.spice"); // usually primary action button
  if (!content.includes('import { C ')) {
    content = content.replace(/import \{.*?\} from "react-native";/s, match => match + "\nimport { C } from '../../drying/src/components/theme';");
  }
  fs.writeFileSync(cameraPath, content);
}

console.log("Theme applied to all screens successfully.");
