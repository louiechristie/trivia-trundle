import Constants from 'expo-constants';
import React, { useContext } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { ActivityIndicator, Text, Button } from 'react-native-paper';

import Header from '../components/Header';
import Question from '../components/Question';
import { Context } from '../context/QuestionsContext';

const DEBUG = Constants.expoConfig?.extra?.debug || false;

interface Props {
  id?: number;
}

export default function QuestionsScreen({ id = 1 }: Props): React.JSX.Element {
  const { state, getQuestions } = useContext(Context);
  const { questions, error, isLoading } = state;
  const empty = questions.length === 0;
  const showInfoBox = error || isLoading || empty;
  const current = questions.find((q) => q.id === id);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Header />
      </View>

      {showInfoBox && (
        <View style={styles.info}>
          {isLoading && <ActivityIndicator />}

          {empty && <Button onPress={getQuestions}>Load questions</Button>}

          {error && <Text variant="bodyMedium">{error}</Text>}
        </View>
      )}

      {!empty && current && (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
          <Question id={current.id} category={current.category} question={current.question} />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    borderWidth: DEBUG ? 2 : 0,
    borderColor: 'red',
  },
  header: {
    borderWidth: DEBUG ? 2 : 0,
    borderColor: 'orange',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: DEBUG ? 2 : 0,
    borderColor: 'yellow',
  },
  scrollView: {
    borderWidth: DEBUG ? 2 : 0,
    borderColor: 'orange',
  },
  contentContainer: {
    flexGrow: 1,
    borderWidth: DEBUG ? 2 : 0,
    borderColor: 'yellow',
    justifyContent: 'center',
  },
});
