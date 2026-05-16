import { render } from '@testing-library/react-native';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import Credits from './Credits';
import Colors from '../constants/Colors';

const renderInTheme = (theme: typeof Colors.light) =>
  render(
    <PaperProvider theme={theme}>
      <Credits />
    </PaperProvider>
  ).toJSON();

test('Credits light theme', () => {
  expect(renderInTheme(Colors.light)).toMatchSnapshot();
});

test('Credits dark theme', () => {
  expect(renderInTheme(Colors.dark)).toMatchSnapshot();
});
