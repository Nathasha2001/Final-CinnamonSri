import React from 'react';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { C } from '../features/drying/src/components/theme';

import HomeScreen from '../features/home/HomeScreen';
import CinnDryNavigator from '../features/drying/src/screens/CinnDry/index';
import CinnOracleApp from '../features/prediction/index';
import CinnHarvest from '../features/harvest/index';

const Stack = createNativeStackNavigator();

// Extend default theme to support dark mode properly
const appNavigationTheme = {
  ...NavigationDefaultTheme,
  dark: true,
  colors: {
    ...NavigationDefaultTheme.colors,
    primary: C.spice,
    background: C.bg,
    card: C.surface,
    text: C.cream,
    border: C.border,
    notification: C.spice,
  },
};

export default function AppNavigator() {
  return (
    <NavigationContainer theme={appNavigationTheme}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: C.surface,
          },
          headerTintColor: C.spiceLight,
          headerTitleStyle: {
            color: C.cream,
            fontFamily: 'Georgia', // fallback to system sans-serif on Android if not loaded
            fontWeight: '700',
          },
          headerBackTitleVisible: false,
          headerBackVisible: true,
          contentStyle: {
            backgroundColor: C.bg,
          },
          gestureEnabled: true,
          animation: 'slide_from_right',
          animationDuration: 320,
        }}
      >
        {/* Main Hub Home Screen */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        {/* CinnamonDry Module */}
        <Stack.Screen
          name="CinnDry"
          component={CinnDryNavigator}
          options={{ headerShown: false }}
        />

        {/* CinnOracle Module */}
        <Stack.Screen
          name="CinnOracle"
          component={CinnOracleApp}
          options={{ headerShown: false }}
        />

        {/* CinnHarvest Module */}
        <Stack.Screen
          name="CinnHarvest"
          component={CinnHarvest}
          options={{ headerShown: false }}
        />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
