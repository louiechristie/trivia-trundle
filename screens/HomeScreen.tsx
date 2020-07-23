import React, { useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Title, Paragraph, Button } from 'react-native-paper';

import Header from '../components/Header';
import { Context } from '../context/QuestionsContext';

export default function HomeScreen({ navigation }): JSX.Element {
  const { state, getQuestions } = useContext(Context);

  const begin = () => {
    getQuestions();
    navigation.navigate('Questions');
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <View>
          <Title>Welcome to the</Title>
          <Title>Trivia Challenge!</Title>
        </View>

        <View>
          <Paragraph>You will be presented</Paragraph>
          <Paragraph>with 10 True or False</Paragraph>
          <Paragraph>questions.</Paragraph>
        </View>

        <View>
          <Paragraph>Can you score 100%?</Paragraph>
        </View>

        <Button mode="contained" style={styles.button} onPress={begin}>
          BEGIN?
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
