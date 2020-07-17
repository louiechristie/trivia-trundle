import Constants from 'expo-constants';
import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';

import { Context } from '../context/QuestionsContext';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Entities = require('html-entities').AllHtmlEntities;

const entities = new Entities();

// const DEBUG = Constants.manifest.extra.debug || false;
const DEBUG = false;

export default function TabOneScreen(): JSX.Element {
  const { state, getQuestions } = useContext(Context);

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <FlatList
        data={state}
        keyExtractor={(item) => item.question}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate('Show', { id: item.id })}>
              <View style={styles.row}>
                <Text>{entities.decode(item.question)}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      {DEBUG && <Text>State: {JSON.stringify(state, null, 2)}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
