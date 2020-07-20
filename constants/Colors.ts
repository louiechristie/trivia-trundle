import { DefaultTheme, DarkTheme } from 'react-native-paper';

const tintColorLight = '#0051E7';
const negative = '#DD4837';
const positive = '#59AF23';

const tintColorDark = '#fff';

export default {
  light: {
    ...DefaultTheme,

    colors: {
      primary: tintColorLight,
      positive,
      negative,
      card: '#FFF3CE',
      surface: '#FFF',
      questionsBackground: '#E0E0E0',
      border: 'rgb(199, 199, 204)',
      text: '#000',
      tint: tintColorLight,
      tabIconDefault: '#ccc',
      tabIconSelected: tintColorLight,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      primary: tintColorDark,
      positive,
      negative,
      text: '#fff',
      // background: '#000',
      tint: tintColorDark,
      tabIconDefault: '#ccc',
      tabIconSelected: tintColorDark,
    },
  },
};
