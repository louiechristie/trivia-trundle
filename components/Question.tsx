import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Title, Paragraph, withTheme } from 'react-native-paper';

// const DEBUG = Constants.manifest.extra.debug || false;
const DEBUG = false;

interface Props {
  index: number;
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  theme: {
    colors: { text: string };
  };
}

const Question = (props: Props): JSX.Element => {
  const {
    index,
    category,
    type,
    difficulty,
    question,
    correct_answer,
    incorrect_answers,
    theme: {
      colors: { text },
    },
  } = props;

  return (
    <View style={styles.container}>
      <Title style={styles.center}>{category}</Title>

      <Surface style={styles.surface}>
        <Paragraph style={styles.center}>{question}</Paragraph>
        <View style={styles.iconContainer}>
          <AntDesign name="question" size={48} color={text} />
        </View>
      </Surface>
      <Paragraph style={styles.center}>{index} of 10</Paragraph>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderWidth: DEBUG ? 2 : 0,
    borderColor: 'yellow',
    alignItems: 'center',
  },
  surface: {
    flex: 1,
    borderWidth: DEBUG ? 2 : 0,
    borderColor: 'green',
    alignItems: 'center',
    padding: 20,
    maxWidth: 300,
  },
  center: { flex: 1, alignItems: 'center', textAlign: 'center' },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default withTheme(Question);
