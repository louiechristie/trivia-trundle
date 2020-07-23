import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: '',
            },
          },
          Questions: {
            screens: {
              QuestionsScreen: 'questions',
              // screens: {
              //   1: '1',
              //   2: '2',
              //   3: '3',
              //   4: '4',
              //   5: '5',
              //   6: '6',
              //   7: '7',
              //   8: '8',
              //   9: '9',
              //   10: '10',
              // },
            },
          },
          Results: {
            screens: {
              ResultsScreen: 'results',
            },
          },
        },
      },
      Home: '*',
    },
  },
};
