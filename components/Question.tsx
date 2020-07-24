import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import React, { useContext } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Surface, Title, Paragraph, useTheme, TouchableRipple } from 'react-native-paper';

import { Context } from '../context/QuestionsContext';

const DEBUG = Constants.manifest.extra.debug || false;

interface Props {
  id: number;
  category: string;
  question: string;
}

export default function Question(props: Props): JSX.Element {
  const { id, category, question } = props;

  const DEBUG = Constants.manifest.extra.debug || false;

  const { navigate } = useNavigation();
  const { setQuestionAnswer } = useContext(Context);
  const { colors } = useTheme();

  const answerFalse = () => {
    if (DEBUG) {
      console.log('Answered False');
    }
    setQuestionAnswer(id, 'False');
    navigate(Number(id + 1).toString());
  };

  const answerTrue = () => {
    if (DEBUG) {
      console.log('Answered True');
    }
    setQuestionAnswer(id, 'True');
    navigate(Number(id + 1).toString());
  };

  return (
    <ScrollView contentContainerStyle={styles.outer}>
      <View style={styles.container}>
        <Title style={styles.titleSection}>{category}</Title>
        <View style={styles.questionSection}>
          <View style={styles.questionContainer}>
            <Surface style={styles.questionSurface}>
              <Paragraph style={styles.paragraph}>{question}</Paragraph>
              <View style={styles.iconContainer}>
                <AntDesign name="question" size={48} color={colors.text} />
              </View>
            </Surface>
            <Paragraph style={styles.questionNumber}>{id} of 10</Paragraph>
          </View>
        </View>
        <View style={styles.buttonsSection}>
          <TouchableRipple
            style={styles.buttonContainer}
            onPress={answerFalse}
            rippleColor="rgba(0, 0, 0, .32)">
            <Surface style={styles.button}>
              <Title style={styles.buttonTitle}>❌</Title>
              <Paragraph
                style={[
                  styles.buttonText,
                  { color: colors.negative, backgroundColor: colors.surface },
                ]}>
                False
              </Paragraph>
            </Surface>
          </TouchableRipple>
          <TouchableRipple
            style={styles.buttonContainer}
            rippleColor="rgba(0, 0, 0, .32)"
            onPress={answerTrue}>
            <Surface style={styles.button}>
              <Title style={styles.buttonTitle}>✅</Title>
              <Paragraph
                style={[
                  styles.buttonText,
                  { color: colors.positive, backgroundColor: colors.surface },
                ]}>
                True
              </Paragraph>
            </Surface>
          </TouchableRipple>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    alignItems: 'center',
    borderWidth: DEBUG ? 2 : 0,
    borderColor: 'yellow',
  },
  container: {
    flex: 1,
    borderWidth: DEBUG ? 2 : 0,
    borderColor: 'green',
    maxWidth: 320,
    padding: 10,
  },
  titleSection: {
    justifyContent: 'center',
    textAlign: 'center',
    borderWidth: DEBUG ? 2 : 0,
    borderColor: 'blue',
  },
  questionSection: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: DEBUG ? 2 : 0,
    borderColor: 'blue',
  },
  questionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: DEBUG ? 2 : 0,
    borderColor: 'indigo',
  },
  questionSurface: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: DEBUG ? 2 : 0,
    borderColor: 'violet',
  },
  paragraph: {},
  questionNumber: {
    borderWidth: DEBUG ? 2 : 0,
    borderColor: 'violet',
  },
  iconContainer: {
    alignItems: 'center',
  },
  buttonsSection: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderWidth: DEBUG ? 2 : 0,
    borderColor: 'indigo',
  },
  buttonContainer: {
    flex: 1,
    margin: 10,
    borderRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: DEBUG ? 2 : 0,
    borderColor: 'violet',
  },
  buttonTitle: {
    fontSize: 28,
    borderWidth: DEBUG ? 1 : 0,
    borderColor: 'grey',
  },
  buttonText: {
    // flex: 1,
    fontSize: 18,
    borderWidth: DEBUG ? 1 : 0,
    borderColor: 'grey',
  },
});
