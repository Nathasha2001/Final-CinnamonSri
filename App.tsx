import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { C } from './src/screens/CinnDry/src/components/theme';

export default function App() {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={C.bg}
        translucent={false}
      />
      <AppNavigator />
    </>
  );
}
