import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import DetectionScreen from './screens/DetectionScreen';
import ScanHistoryScreen from './screens/ScanHistoryScreen';
import GuideScreen from './screens/GuideScreen';
import CameraScreen from './screens/CameraScreen';
import PreventionScreen from './screens/PreventionScreen';

export type CinnGuardStackParamList = {
  Home: undefined;
  Detection: { imageUri?: string };
  ScanHistory: undefined;
  Guide: undefined;
  Camera: undefined;
  Prevention: { diseaseName?: string, confidence?: number };
};

const Stack = createNativeStackNavigator<CinnGuardStackParamList>();

export default function CinnGuardNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Detection" 
        component={DetectionScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="ScanHistory" 
        component={ScanHistoryScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Guide" 
        component={GuideScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Camera" 
        component={CameraScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Prevention" 
        component={PreventionScreen} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}
