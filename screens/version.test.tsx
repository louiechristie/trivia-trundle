import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { PaperProvider } from 'react-native-paper';

import HomeScreen from './HomeScreen';
import appJson from '../app.json';
import Colors from '../constants/Colors';
import { Context } from '../context/QuestionsContext';
import packageJson from '../package.json';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: () => undefined }),
}));

// Make Constants.expoConfig surface the real app.json so the rendered
// version reflects what ships in the bundle, not jest-expo's stub.
jest.mock('expo-constants', () => ({
  __esModule: true,
  default: { expoConfig: jest.requireActual('../app.json').expo },
}));

const contextValue = {
  state: { questions: [], error: null, isLoading: false, score: 0 },
  getQuestions: () => undefined,
  setQuestionAnswer: () => undefined,
};

const mockProps = {
  navigation: { navigate: () => undefined } as never,
  route: { key: 'Home', name: 'Home' } as never,
};

test('package.json and app.json version are in sync', () => {
  expect(packageJson.version).toBe(appJson.expo.version);
});

test('HomeScreen renders the version from app.json', () => {
  const expected = appJson.expo.version;

  render(
    <Context.Provider value={contextValue}>
      <PaperProvider theme={Colors.light}>
        <HomeScreen {...mockProps} />
      </PaperProvider>
    </Context.Provider>
  );

  expect(screen.getByText(new RegExp(`Version: ${expected}`))).toBeTruthy();
});
