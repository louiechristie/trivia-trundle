// import Constants from 'expo-constants';
import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import Header from '../components/Header';
import { Context } from '../context/QuestionsContext';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Entities = require('html-entities').AllHtmlEntities;

const entities = new Entities();

// const DEBUG = Constants.manifest.extra.debug || false;

export default function TabOneScreen(): JSX.Element {
  const { state, getQuestions } = useContext(Context);

  useEffect(() => {
    getQuestions();
    // Only get once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={state}
        keyExtractor={(item) => item.question}
        renderItem={({ item }) => {
          return (
            <View style={styles.row}>
              <Text>{entities.decode(item.question)}</Text>
            </View>
          );
        }}
      />

      {/* {DEBUG && <Text>State: {JSON.stringify(state, null, 2)}</Text>} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  row: {
    padding: 10,
  },
});
