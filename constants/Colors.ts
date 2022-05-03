// import {
//   DefaultTheme as NavigationDefaultTheme,
//   DarkTheme as NavigationDarkTheme,
// } from '@react-navigation/native';
import { DefaultTheme, DarkTheme } from 'react-native-paper';

const tintColorLight = '#0051E7';
const negative = '#DD4837';
const positive = '#59AF23';

const tintColorDark = '#fff';

export default {
  light: {
    ...DefaultTheme,

    colors: {
      ...DefaultTheme.colors,
      primary: tintColorLight,
      positive,
      negative,
      questionBackgroundColor: '#FFF',
      questionBorderColor: '#000',
      card: '#FFF',
      surface: '#FFF',
      border: 'rgb(199, 199, 204)',
      text: '#000',
      background: '#FFF',
      lightText: '#FFF',
      tint: tintColorLight,
      tabIconDefault: '#CCC',
      tabIconSelected: tintColorLight,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: tintColorDark,
      positive,
      negative,
      questionBackgroundColor: '#000',
      questionBorderColor: '#FFF',
      card: '#000',
      surface: '#000',
      text: '#FFF',
      background: '#000',
      lightText: '#FFF',
      tint: tintColorDark,
      tabIconDefault: '#CCC',
      tabIconSelected: tintColorDark,
    },
  },
};
