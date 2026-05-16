import { render } from '@testing-library/react-native';
import React from 'react';
import { PaperProvider } from 'react-native-paper';

import Header from './Header';
import Colors from '../constants/Colors';

jest.mock('expo-router', () => ({
  useRouter: () => ({ push: () => undefined, replace: () => undefined, back: () => undefined }),
}));

const renderInTheme = (theme: typeof Colors.light) =>
  render(
    <PaperProvider theme={theme}>
      <Header />
    </PaperProvider>
  ).toJSON();

test('Header light theme', () => {
  expect(renderInTheme(Colors.light)).toMatchSnapshot();
});

test('Header dark theme', () => {
  expect(renderInTheme(Colors.dark)).toMatchSnapshot();
});
