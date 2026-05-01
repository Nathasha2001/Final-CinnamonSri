import "react-native-gesture-handler";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import { CameraScreen } from "./src/screens/CameraScreen";
import { CropImageScreen } from "./src/screens/CropImageScreen";
import { HistoryScreen } from "./src/screens/HistoryScreen";
import { HomeScreen } from "./src/screens/HomeScreen";
import { PhotoPreviewScreen } from "./src/screens/PhotoPreviewScreen";
import { ResultScreen } from "./src/screens/ResultScreen";
import { ThicknessEstimatorScreen } from "./src/screens/ThicknessEstimatorScreen";
import { TipsScreen } from "./src/screens/TipsScreen";
import { ToolsScreen } from "./src/screens/ToolsScreen";
import { palette } from "./src/theme";
import { RootStackParamList } from "./src/navigation/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function CinnHarvestApp() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack.Navigator
        initialRouteName="Tools"
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: palette.background,
          },
          animation: "none", // Instant switch like CinnDry tabs
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Tools" component={ToolsScreen} />
        <Stack.Screen name="Tips" component={TipsScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="ThicknessEstimator" component={ThicknessEstimatorScreen} />
        <Stack.Screen name="ScanCamera" component={CameraScreen} />
        <Stack.Screen name="CropImage" component={CropImageScreen} />
        <Stack.Screen name="PhotoPreview" component={PhotoPreviewScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </>
  );
}
