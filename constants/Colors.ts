import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';

const tintColorLight = '#0051E7';
const tintColorDark = '#fff';
const negative = '#DD4837';
const positive = '#59AF23';

export type AppTheme = MD3Theme & {
  colors: MD3Theme['colors'] & {
    positive: string;
    negative: string;
    questionBackgroundColor: string;
    questionBorderColor: string;
    lightText: string;
  };
};

const Colors: { light: AppTheme; dark: AppTheme } = {
  light: {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: tintColorLight,
      background: '#FFF',
      surface: '#FFF',
      positive,
      negative,
      questionBackgroundColor: '#FFF',
      questionBorderColor: '#000',
      lightText: '#FFF',
    },
  },
  dark: {
    ...MD3DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      primary: tintColorDark,
      background: '#000',
      surface: '#000',
      positive,
      negative,
      questionBackgroundColor: '#000',
      questionBorderColor: '#FFF',
      lightText: '#FFF',
    },
  },
};

export default Colors;
