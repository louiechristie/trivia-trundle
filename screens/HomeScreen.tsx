import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';

import Credits from '../components/Credits';
import Header from '../components/Header';
import type { AppTheme } from '../constants/Colors';
import { Context } from '../context/QuestionsContext';

export default function HomeScreen(): React.JSX.Element {
  const router = useRouter();
  const { getQuestions } = useContext(Context);
  const { colors } = useTheme<AppTheme>();

  const begin = () => {
    getQuestions();
    router.push('/questions/1');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header />
      <View style={styles.content}>
        <View>
          <Text variant="titleLarge" style={styles.title}>
            Welcome to the Trivia Challenge!
          </Text>
        </View>

        <View>
          <Text variant="bodyMedium" style={styles.paragraph}>
            You will be presented
          </Text>
          <Text variant="bodyMedium" style={styles.paragraph}>
            with 10 True or False
          </Text>
          <Text variant="bodyMedium" style={styles.paragraph}>
            questions.
          </Text>
        </View>

        <View>
          <Text variant="bodyMedium" style={styles.paragraph}>
            Can you score 100%?
          </Text>
        </View>

        <Button mode="contained" contentStyle={styles.button} onPress={begin}>
          BEGIN
        </Button>

        <Credits />

        <Text variant="bodyMedium">
          Version: {Constants?.expoConfig?.version} {__DEV__ ? ' [DEV] ' : ''}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 24,
    lineHeight: 24 * 1.2,
    textAlign: 'center',
  },
  button: {
    height: 60,
    width: 200,
  },
});
