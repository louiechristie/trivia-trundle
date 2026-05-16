import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Colors from '../constants/Colors';
import { Provider as QuestionsProvider } from '../context/QuestionsContext';
import useCachedResources from '../hooks/useCachedResources';
import useColorScheme from '../hooks/useColorScheme';

export default function RootLayout(): React.JSX.Element {
  useCachedResources();
  const colorScheme = useColorScheme();

  return (
    <QuestionsProvider>
      <SafeAreaProvider>
        <PaperProvider theme={colorScheme === 'dark' ? Colors.dark : Colors.light}>
          <StatusBar style="light" />
          <Stack screenOptions={{ headerShown: false }} />
        </PaperProvider>
      </SafeAreaProvider>
    </QuestionsProvider>
  );
}
