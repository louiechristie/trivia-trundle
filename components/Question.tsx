import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import React, { useContext } from 'react';
import { Text as RNText, StyleSheet, View, ScrollView } from 'react-native';
import { Surface, Text, useTheme, TouchableRipple } from 'react-native-paper';

import type { AppTheme } from '../constants/Colors';
import { Context } from '../context/QuestionsContext';
import { TrueOrFalse, QuestionsStackParamList, QuestionStackProps } from '../types';

const DEBUG = Constants.expoConfig?.extra?.debug || false;

interface Props {
  id: number;
  category: string;
  question: string;
}

export default function Question(props: Props): React.JSX.Element {
  const { id, category, question } = props;

  const DEBUG = Constants.expoConfig?.extra?.debug || false;

  const { navigate } = useNavigation<QuestionStackProps>();
  const { setQuestionAnswer } = useContext(Context);
  const { colors } = useTheme<AppTheme>();

  const answer = (given_answer: TrueOrFalse) => {
    if (DEBUG) {
      // eslint-disable-next-line no-console
      console.log(`Question ${id} Answered ${given_answer}`);
    }

    let nextScreenName: keyof QuestionsStackParamList;
    const screenPlusOne = id + 1;

    if (screenPlusOne <= 10) {
      nextScreenName = Number(screenPlusOne).toString() as unknown as keyof QuestionsStackParamList;
    } else {
      nextScreenName = 'Results' as keyof QuestionsStackParamList;
    }

    setQuestionAnswer(id, given_answer);
    navigate(nextScreenName);
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.outer, { backgroundColor: colors.questionBackgroundColor }]}>
      <View style={styles.container}>
        <Text variant="titleLarge" style={styles.titleSection}>
          {category}
        </Text>
        <View style={styles.questionSection}>
          <View style={styles.questionContainer}>
            <Surface
              style={[
                styles.questionSurface,
                {
                  borderColor: DEBUG ? 'violet' : colors.questionBorderColor,
                  backgroundColor: colors.questionBackgroundColor,
                },
              ]}>
              <Text variant="bodyMedium" style={styles.paragraph}>
                {question}
              </Text>
              <View style={styles.iconContainer}>
                <RNText style={{ fontSize: 48 }}>?</RNText>
              </View>
            </Surface>
            <Text variant="bodyMedium" style={styles.questionNumber}>
              {id} of 10
            </Text>
          </View>
        </View>
        <View style={styles.buttonsSection}>
          <TouchableRipple
            style={styles.buttonContainer}
            onPress={() => {
              answer('False');
            }}
            rippleColor="rgba(255, 255, 255, .32)">
            <Surface style={[styles.button, { backgroundColor: colors.negative }]}>
              <RNText
                style={{
                  fontSize: 48,
                  color: colors.lightText,
                }}>
                ✗
              </RNText>

              <Text
                variant="bodyMedium"
                style={[
                  styles.buttonText,
                  { color: colors.lightText, backgroundColor: colors.negative },
                ]}>
                False
              </Text>
            </Surface>
          </TouchableRipple>
          <TouchableRipple
            style={styles.buttonContainer}
            rippleColor="rgba(255, 255, 255, .66)"
            onPress={() => {
              answer('True');
            }}>
            <Surface style={[styles.button, { backgroundColor: colors.positive }]}>
              <RNText style={{ fontSize: 48, color: colors.lightText }}>✓</RNText>

              <RNText
                style={[
                  styles.buttonText,
                  { color: colors.lightText, backgroundColor: colors.positive },
                ]}>
                True
              </RNText>
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
    padding: 10,
    paddingBottom: 30,
    justifyContent: 'space-between',
    borderWidth: DEBUG ? 2 : 0,
    borderColor: 'green',
    width: 320,
  },
  titleSection: {
    justifyContent: 'center',
    textAlign: 'center',
    borderWidth: DEBUG ? 2 : 0,
    borderColor: 'blue',
  },
  questionSection: {
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
    padding: 30,
    minHeight: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 2,
  },
  paragraph: {
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 18 * 1.2,
  },
  questionNumber: {
    borderWidth: DEBUG ? 2 : 0,
    borderColor: 'violet',
  },
  iconContainer: {
    alignItems: 'center',
  },
  buttonsSection: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderWidth: DEBUG ? 2 : 0,
    borderColor: 'indigo',
  },
  buttonContainer: {
    flexBasis: '45%',
    borderRadius: 5,
    borderWidth: DEBUG ? 2 : 0,
    borderColor: 'violet',
  },
  button: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: DEBUG ? 1 : 0,
    borderColor: 'brown',
  },
  icon: {
    borderWidth: DEBUG ? 1 : 0,
    borderColor: 'grey',
  },
  buttonText: {
    fontSize: 18,
    borderWidth: DEBUG ? 1 : 0,
    borderColor: 'grey',
  },
});
