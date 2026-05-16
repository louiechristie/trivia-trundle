// react-native-paper v4's compiled .d.ts files still reference `tvParallaxProperties`,
// which RN 0.76 removed from ViewProps. Re-declare it here so Paper components type-check.
// Remove when the project moves off react-native-paper v4.
import 'react-native';

declare module 'react-native' {
  interface TVViewPropsIOS {
    tvParallaxProperties?: object;
  }
}
