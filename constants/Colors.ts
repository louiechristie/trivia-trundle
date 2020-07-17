import { DefaultTheme, DarkTheme } from 'react-native-paper';

const tintColorLight = '#0051E7';
const tintColorDark = '#fff';

export default {
  light: {
    ...DefaultTheme,

    colors: {
      primary: tintColorLight,
      card: '#FFF3CE',
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
      text: '#fff',
      background: '#000',
      tint: tintColorDark,
      tabIconDefault: '#ccc',
      tabIconSelected: tintColorDark,
    },
  },
};
