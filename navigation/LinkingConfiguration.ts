import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Home: '/trivia-trundle/',
      Questions: '/trivia-trundle/questions',
      Results: '/trivia-trundle/results',
    },
  },
};
