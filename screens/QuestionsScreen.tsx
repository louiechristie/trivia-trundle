import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import type { ParamListBase } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import Constants from 'expo-constants';
import React, { useContext } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { withTheme, ActivityIndicator, Paragraph, Button } from 'react-native-paper';

import Header from '../components/Header';
import Question from '../components/Question';
import { Context } from '../context/QuestionsContext';
import { Question as QuestionType } from '../types';

const DEBUG = Constants.manifest.extra.debug || false;

const MaterialTopTabs = createMaterialTopTabNavigator();

function QuestionsScreen({
  navigation,
  theme: {
    colors: { questionsBackground },
  },
}: StackScreenProps<ParamListBase>) {
  const { state, getQuestions } = useContext(Context);
  const { questions, error, isLoading } = state;
  const empty = questions.length === 0;
  const showInfoBox = error || isLoading || empty;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      cardStyle: { flex: 1 },
    });
  }, [navigation]);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Header />
      </View>

      {showInfoBox && (
        <View style={styles.info}>
          {isLoading && <ActivityIndicator />}

          {empty && <Button onPress={getQuestions}>Load questions.</Button>}

          {error && <Paragraph>{error}</Paragraph>}
        </View>
      )}

      {!empty && (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.contentContainer,
            { backgroundColor: questionsBackground },
          ]}>
          <MaterialTopTabs.Navigator style={styles.tabNavigator} initialRouteName="1">
            {questions.map((question: QuestionType) => {
              const title = Number(question.id).toString();
              const ThisQuestion = () => <Question {...question} />;
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
  tabNavigator: {
    flex: 1,
    flexGrow: 1,
    borderWidth: DEBUG ? 2 : 0,
    borderColor: 'green',
    justifyContent: 'center',
  },
});

export default withTheme(QuestionsScreen);
