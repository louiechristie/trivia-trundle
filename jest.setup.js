// jest-expo's auto-mock for ExpoFontLoader.getLoadedFonts returns undefined, but
// expo-font's memory module calls .forEach on it. Mock expo-font with a stateful
// cache that mirrors the real module's load semantics so @expo/vector-icons (via
// Paper's Appbar.Action) renders consistently across tests.
const cache = {};

jest.mock('expo-font', () => ({
  __esModule: true,
  isLoaded: (name) => Boolean(cache[name]),
  isLoading: () => false,
  loadAsync: jest.fn(async (fontMap) => {
    Object.keys(fontMap ?? {}).forEach((k) => {
      cache[k] = true;
    });
  }),
  unloadAsync: jest.fn().mockResolvedValue(undefined),
  unloadAllAsync: jest.fn().mockResolvedValue(undefined),
  getLoadedFonts: () => Object.keys(cache),
  useFonts: () => [true, null],
  processFontFamily: (name) => name,
}));
