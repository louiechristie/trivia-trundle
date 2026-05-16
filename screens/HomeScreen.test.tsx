import { render } from '@testing-library/react-native';
import React from 'react';
import { PaperProvider } from 'react-native-paper';

import HomeScreen from './HomeScreen';
import Colors from '../constants/Colors';
import { Context } from '../context/QuestionsContext';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: () => undefined }),
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

const renderInTheme = (theme: typeof Colors.light) =>
  render(
    <Context.Provider value={contextValue}>
      <PaperProvider theme={theme}>
        <HomeScreen {...mockProps} />
      </PaperProvider>
    </Context.Provider>
  ).toJSON();

test('HomeScreen light theme', () => {
  expect(renderInTheme(Colors.light)).toMatchSnapshot();
});

test('HomeScreen dark theme', () => {
  expect(renderInTheme(Colors.dark)).toMatchSnapshot();
});
