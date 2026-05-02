import React from 'react';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { C } from '../screens/CinnDry/src/components/theme';

import HomeScreen from '../screens/Home/HomeScreen';
import CinnDryNavigator from '../screens/CinnDry/src/screens/CinnDry/index';
import CinnOracleApp from '../screens/CinnOracle/index';
import CinnHarvest from '../screens/CinnHarvest/index';
import CinnGuardApp from '../screens/CinnGuard/index';

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

        {/* CinnGuard Module */}
        <Stack.Screen
          name="CinnGuard"
          component={CinnGuardApp}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
