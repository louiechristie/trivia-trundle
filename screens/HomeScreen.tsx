import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Title, Paragraph, Button, useTheme } from 'react-native-paper';

import Header from '../components/Header';
import { Context } from '../context/QuestionsContext';
import { RootStackParamList } from '../types';

type Props = StackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props): JSX.Element {
  const { getQuestions } = useContext(Context);
  const { colors } = useTheme();

  const begin = () => {
    getQuestions();
    navigation.navigate('Questions');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header />
      <View style={styles.content}>
        <View>
          <Title style={styles.title}>Welcome to the</Title>
          <Title style={styles.title}>Trivia Challenge!</Title>
        </View>

        <View>
          <Paragraph style={styles.paragraph}>You will be presented</Paragraph>
          <Paragraph style={styles.paragraph}>with 10 True or False</Paragraph>
          <Paragraph style={styles.paragraph}>questions.</Paragraph>
        </View>

        <View>
          <Paragraph style={styles.paragraph}>Can you score 100%?</Paragraph>
        </View>

        <Button mode="contained" contentStyle={styles.button} onPress={begin}>
          BEGIN
        </Button>
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
