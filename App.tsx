import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Colors from './constants/Colors';
import { Provider as QuestionsProvider } from './context/QuestionsContext';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App(): JSX.Element {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  // const colorScheme = 'light';

  if (!isLoadingComplete) {
    return <ActivityIndicator />;
  } else {
    return (
      <QuestionsProvider>
        <SafeAreaProvider>
          <PaperProvider theme={colorScheme === 'dark' ? Colors.dark : Colors.light}>
            <StatusBar style="light" />
            <Navigation colorScheme={colorScheme} />
          </PaperProvider>
        </SafeAreaProvider>
      </QuestionsProvider>
    );
  }
}
