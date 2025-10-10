import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Constants from 'expo-constants';
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Title, Paragraph, Button, useTheme } from 'react-native-paper';

import Credits from '../components/Credits';
import Header from '../components/Header';
import { Context } from '../context/QuestionsContext';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

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
          <Title style={styles.title}>Welcome to the Trivia Challenge!</Title>
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

        <Credits />

        <Paragraph>
          Version: {Constants?.expoConfig?.version} {__DEV__ ? ' [DEV] ' : ''}
        </Paragraph>
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
