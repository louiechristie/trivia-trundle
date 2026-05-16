import { render } from '@testing-library/react-native';
import React from 'react';
import { PaperProvider } from 'react-native-paper';

import ResultsScreen from './ResultsScreen';
import Colors from '../constants/Colors';
import { Context, transformQuestions } from '../context/QuestionsContext';
import TestQuestions from '../data/QuestionsTestData';
import { State, TrueOrFalse, rawQuestion } from '../types';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: () => undefined }),
}));

const answeredQuestions = transformQuestions(TestQuestions as rawQuestion[]).map((q, i) => {
  const given_answer: TrueOrFalse = i % 2 === 0 ? 'True' : 'False';
  return {
    ...q,
    given_answer,
    answered_correctly: given_answer === q.correct_answer,
  };
});

const completedState: State = {
  questions: answeredQuestions,
  error: null,
  isLoading: false,
  score: answeredQuestions.filter((q) => q.answered_correctly).length,
};

const emptyState: State = { questions: [], error: null, isLoading: false, score: 0 };

const makeContext = (state: State) => ({
  state,
  getQuestions: () => undefined,
  setQuestionAnswer: () => undefined,
});

const mockProps = {
  navigation: { navigate: () => undefined } as never,
  route: { key: 'Results', name: 'Results' } as never,
};

const renderInTheme = (theme: typeof Colors.light, state: State) =>
  render(
    <Context.Provider value={makeContext(state)}>
      <PaperProvider theme={theme}>
        <ResultsScreen {...mockProps} />
      </PaperProvider>
    </Context.Provider>
  ).toJSON();

test('ResultsScreen completed - light', () => {
  expect(renderInTheme(Colors.light, completedState)).toMatchSnapshot();
});

test('ResultsScreen completed - dark', () => {
  expect(renderInTheme(Colors.dark, completedState)).toMatchSnapshot();
});

test('ResultsScreen empty - light', () => {
  expect(renderInTheme(Colors.light, emptyState)).toMatchSnapshot();
});
