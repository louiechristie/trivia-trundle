import Constants from 'expo-constants';
import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Paragraph, ActivityIndicator } from 'react-native-paper';

import Header from '../components/Header';
import { Context } from '../context/QuestionsContext';
import { question } from '../types';

const DEBUG = Constants.manifest.extra.debug || false;

export default function ResultsScreen(): JSX.Element {
  const { state, getQuestions } = useContext(Context);
  const { questions, error, isLoading } = state;

  useEffect(() => {
    getQuestions();
    // Only get once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.outer}>
      <Header />

      <FlatList
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={questions}
        keyExtractor={(item: question) => item.question}
        renderItem={({ item }) => {
          return (
            <View style={styles.row}>
              <Paragraph>{item.question}</Paragraph>
            </View>
          );
        }}
        ListEmptyComponent={
          <View style={styles.empty}>
            {isLoading && <ActivityIndicator style={{ flex: 1 }} />}
            {error && <Paragraph style={{ flex: 1 }}>{error}</Paragraph>}
            {DEBUG && (
              <Paragraph style={styles.debug}>State: {JSON.stringify(state, null, 2)}</Paragraph>
            )}
          </View>
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
    borderWidth: DEBUG ? 2 : 0,
    borderColor: 'orange',
  },
  contentContainer: {
    alignItems: 'center',
    borderWidth: DEBUG ? 2 : 0,
    borderColor: 'yellow',
  },
  row: {
    width: 300,
    padding: 10,
    borderWidth: DEBUG ? 1 : 0,
    borderColor: 'green',
  },
  empty: {
    width: 300,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: DEBUG ? 1 : 0,
    borderColor: 'green',
  },
  debug: { flex: 1, paddingTop: 10 },
});
