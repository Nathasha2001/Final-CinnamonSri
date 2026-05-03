const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../Cinnguard/app');
const destDir = path.join(__dirname, 'src/features/guard/screens');

const screens = [
  { src: '(tabs)/index.tsx', dest: 'HomeScreen.tsx' },
  { src: 'detection.tsx', dest: 'DetectionScreen.tsx' },
  { src: 'scan-history.tsx', dest: 'ScanHistoryScreen.tsx' },
  { src: 'guide.tsx', dest: 'GuideScreen.tsx' },
  { src: 'camera.tsx', dest: 'CameraScreen.tsx' },
  { src: 'prevention.tsx', dest: 'PreventionScreen.tsx' },
];

screens.forEach(screen => {
  const srcPath = path.join(srcDir, screen.src);
  const destPath = path.join(destDir, screen.dest);
  
  if (fs.existsSync(srcPath)) {
    let content = fs.readFileSync(srcPath, 'utf8');
    
    // Replace expo-router imports with react-navigation
    content = content.replace(/import\s+\{.*useRouter.*\}\s+from\s+['"]expo-router['"];?/, "import { useNavigation } from '@react-navigation/native';");
    content = content.replace(/const\s+router\s*=\s*useRouter\(\);/, "const navigation = useNavigation<any>();");
    
    // Replace router.push(...) with navigation.navigate(...)
    // Handle router.push("/path")
    content = content.replace(/router\.push\(['"]\/guide['"]\)/g, "navigation.navigate('Guide')");
    content = content.replace(/router\.push\(['"]\/scan-history['"]\)/g, "navigation.navigate('ScanHistory')");
    content = content.replace(/router\.push\(['"]\/prevention['"]\)/g, "navigation.navigate('Prevention')");
    content = content.replace(/router\.push\(['"]\/camera['"]\)/g, "navigation.navigate('Camera')");
    
    // Handle router.back()
    content = content.replace(/router\.back\(\)/g, "navigation.goBack()");
    
    // Handle router.push({ pathname: ... })
    content = content.replace(/router\.push\(\{\s*pathname:\s*['"]\/detection['"],\s*params:\s*\{(.*?)\}\s*,?\s*\}\)/gs, "navigation.navigate('Detection', {$1})");
    
    // Also expo-router Link or other things if they exist
    content = content.replace(/import\s+\{.*useLocalSearchParams.*\}\s+from\s+['"]expo-router['"];?/, "import { useRoute } from '@react-navigation/native';");
    content = content.replace(/const\s+\{\s*(.*?)\s*\}\s*=\s*useLocalSearchParams\(\);/, "const route = useRoute<any>();\n  const { $1 } = route.params || {};");

    fs.writeFileSync(destPath, content);
    console.log(`Migrated ${screen.src} -> ${screen.dest}`);
  } else {
    console.warn(`Could not find ${srcPath}`);
  }
});
