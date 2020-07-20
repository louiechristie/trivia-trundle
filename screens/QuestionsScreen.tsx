import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import type { ParamListBase } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import Constants from 'expo-constants';
import React, { useContext } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { withTheme } from 'react-native-paper';

import Header from '../components/Header';
import Question from '../components/Question';
import { Context } from '../context/QuestionsContext';
import { question as questionType } from '../types';

const DEBUG = Constants.manifest.extra.debug || false;

const MaterialTopTabs = createMaterialTopTabNavigator();

function QuestionsScreen({
  navigation,
  theme: {
    colors: { questionsBackground },
  },
}: StackScreenProps<ParamListBase>) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      cardStyle: { flex: 1 },
    });
  }, [navigation]);

  const { state } = useContext(Context);

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: questionsBackground }]}>
      <Header />
      <MaterialTopTabs.Navigator
        style={{
          flex: 1,
          flexGrow: 100,
          borderWidth: DEBUG ? 2 : 0,
          borderColor: 'orange',
          justifyContent: 'center',
        }}>
        {state.map((question: questionType, index: number) => {
          const title = Number(index + 1).toString();
          const ThisQuestion = () => <Question index={index + 1} {...question} />;
          return (
            <MaterialTopTabs.Screen
              key={title}
              name={title}
              component={ThisQuestion}
              options={{ title }}
            />
          );
        })}
      </MaterialTopTabs.Navigator>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: DEBUG ? 2 : 0,
    borderColor: 'red',
    justifyContent: 'center',
  },
  content: {
    padding: 4,
  },
  card: {
    margin: 4,
  },
});

export default withTheme(QuestionsScreen);
