import { render } from '@testing-library/react-native';
import React from 'react';
import { PaperProvider } from 'react-native-paper';

import QuestionsScreen from './QuestionsScreen';
import Colors from '../constants/Colors';
import { Context } from '../context/QuestionsContext';
import { State } from '../types';

// Use fake timers so react-native-paper's ActivityIndicator animation loop
// doesn't fire state updates after the render and trigger act() warnings.
jest.useFakeTimers();

jest.mock('expo-router', () => ({
  useRouter: () => ({ push: () => undefined, replace: () => undefined, back: () => undefined }),
}));

const makeContext = (state: State) => ({
  state,
  getQuestions: () => undefined,
  setQuestionAnswer: () => undefined,
});

const renderInTheme = (theme: typeof Colors.light, state: State) =>
  render(
    <Context.Provider value={makeContext(state)}>
      <PaperProvider theme={theme}>
        <QuestionsScreen />
      </PaperProvider>
    </Context.Provider>
  ).toJSON();

const emptyState: State = { questions: [], error: null, isLoading: false, score: 0 };
const loadingState: State = { questions: [], error: null, isLoading: true, score: 0 };
const errorState: State = {
  questions: [],
  error:
    'Sorry, there was a problem downloading questions. Please check you are connected to the internet and try again.',
  isLoading: false,
  score: 0,
};

test('QuestionsScreen empty state - light', () => {
  expect(renderInTheme(Colors.light, emptyState)).toMatchSnapshot();
});

test('QuestionsScreen empty state - dark', () => {
  expect(renderInTheme(Colors.dark, emptyState)).toMatchSnapshot();
});

test('QuestionsScreen loading state - light', () => {
  expect(renderInTheme(Colors.light, loadingState)).toMatchSnapshot();
});

test('QuestionsScreen error state - light', () => {
  expect(renderInTheme(Colors.light, errorState)).toMatchSnapshot();
});
