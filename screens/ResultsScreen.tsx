import Constants from 'expo-constants';
import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Paragraph, ActivityIndicator, Button } from 'react-native-paper';

import Header from '../components/Header';
import { Context } from '../context/QuestionsContext';
import { Question } from '../types';

const DEBUG = Constants.manifest.extra.debug || false;

export default function ResultsScreen({ navigation }): JSX.Element {
  const { state } = useContext(Context);
  const { questions, error, isLoading } = state;

  const playAgain = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.outer}>
      <Header />

      <FlatList
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={questions}
        keyExtractor={(item: Question) => item.question}
        renderItem={({ item }) => {
          return (
            <View style={styles.row}>
              <Paragraph>{item.question}</Paragraph>
            </View>
          );
        }}
        ListEmptyComponent={
          <View style={styles.empty}>
            {isLoading && <ActivityIndicator />}
            <Paragraph>No results to display.</Paragraph>
            {error && <Paragraph>{error}</Paragraph>}
            {DEBUG && (
              <Paragraph style={styles.debug}>State: {JSON.stringify(state, null, 2)}</Paragraph>
            )}
          </View>
        }
        ListFooterComponent={
          <Button mode="contained" style={styles.button} onPress={playAgain}>
            PLAY AGAIN?
          </Button>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    borderWidth: DEBUG ? 2 : 0,
    borderColor: 'red',
  },
  container: {
    flex: 1,
    borderWidth: DEBUG ? 2 : 0,
    borderColor: 'orange',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: DEBUG ? 2 : 0,
    borderColor: 'yellow',
  },
  row: {
    width: 310,
    borderWidth: DEBUG ? 1 : 0,
    borderColor: 'green',
  },
  empty: {
    flex: 1,
    width: 300,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: DEBUG ? 1 : 0,
    borderColor: 'green',
  },
  debug: { paddingTop: 10 },
  button: {
    margin: 30,
  },
});
