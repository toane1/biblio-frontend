import React from 'react';
import AppNavigator from "./src/routes/AppNavigator";
import {PaperProvider} from "react-native-paper";
import {SafeAreaProvider} from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <AppNavigator/>
      </PaperProvider>
    </SafeAreaProvider>
  );
}