import { AntDesign, Entypo } from '@expo/vector-icons';
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

  const answer = (given_answer: string) => {
    if (DEBUG) {
      console.log(`Answered ${given_answer}`);
    }

    let nextScreenName;
    const screenPlusOne = id + 1;

    if (screenPlusOne <= 10) {
      nextScreenName = Number(screenPlusOne).toString();
    } else {
      nextScreenName = 'Results';
    }

    navigate(nextScreenName);
    setQuestionAnswer(id, given_answer);
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.outer, { backgroundColor: colors.questionBackgroundColor }]}>
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
            onPress={() => {
              answer('False');
            }}
            rippleColor="rgba(255, 255, 255, .32)">
            <Surface style={[styles.button, { backgroundColor: colors.negative }]}>
              <Entypo name="cross" size={48} color={colors.lightText} />

              <Paragraph
                style={[
                  styles.buttonText,
                  { color: colors.lightText, backgroundColor: colors.negative },
                ]}>
                False
              </Paragraph>
            </Surface>
          </TouchableRipple>
          <TouchableRipple
            style={styles.buttonContainer}
            rippleColor="rgba(255, 255, 255, .66)"
            onPress={() => {
              answer('True');
            }}>
            <Surface style={[styles.button, { backgroundColor: colors.positive }]}>
              <Entypo name="check" size={48} color={colors.lightText} />

              <Paragraph
                style={[
                  styles.buttonText,
                  { color: colors.lightText, backgroundColor: colors.positive },
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
    paddingBottom: 20,
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
    flex: 3,
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
    minWidth: 300,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: DEBUG ? 2 : 0,
    borderColor: 'violet',
  },
  paragraph: {
    fontSize: 20,
    lineHeight: 20 * 1.2,
  },
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
    fontSize: 18,
    borderWidth: DEBUG ? 1 : 0,
    borderColor: 'grey',
  },
});
