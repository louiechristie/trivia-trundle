import { render } from '@testing-library/react-native';
import React from 'react';
import { PaperProvider } from 'react-native-paper';

import HomeScreen from './HomeScreen';
import Colors from '../constants/Colors';
import { Context } from '../context/QuestionsContext';

jest.mock('expo-router', () => ({
  useRouter: () => ({ push: () => undefined, replace: () => undefined, back: () => undefined }),
}));

const contextValue = {
  state: { questions: [], error: null, isLoading: false, score: 0 },
  getQuestions: () => undefined,
  setQuestionAnswer: () => undefined,
};

const renderInTheme = (theme: typeof Colors.light) =>
  render(
    <Context.Provider value={contextValue}>
      <PaperProvider theme={theme}>
        <HomeScreen />
      </PaperProvider>
    </Context.Provider>
  ).toJSON();

test('HomeScreen light theme', () => {
  expect(renderInTheme(Colors.light)).toMatchSnapshot();
});

test('HomeScreen dark theme', () => {
  expect(renderInTheme(Colors.dark)).toMatchSnapshot();
});
