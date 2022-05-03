// createMaterialTopTabNavigator used for debugging only
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import type { ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Constants from 'expo-constants';
import React, { useContext } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { ActivityIndicator, Paragraph, Button } from 'react-native-paper';

import Header from '../components/Header';
import Question from '../components/Question';
import { Context } from '../context/QuestionsContext';
import { Question as QuestionType } from '../types';

const DEBUG = Constants.manifest?.extra?.debug || false;

const Navigator = createNativeStackNavigator();

export default function QuestionsScreen({
  navigation,
}: NativeStackScreenProps<ParamListBase>): JSX.Element {
  const { state, getQuestions } = useContext(Context);
  const { questions, error, isLoading } = state;
  const empty = questions.length === 0;
  const showInfoBox = error || isLoading || empty;

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Header />
      </View>

      {showInfoBox && (
        <View style={styles.info}>
          {isLoading && <ActivityIndicator />}

          {empty && <Button onPress={getQuestions}>Load questions</Button>}

          {error && <Paragraph>{error}</Paragraph>}
        </View>
      )}

      {!empty && (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
          <Navigator.Navigator initialRouteName="1">
            {questions.map((question: QuestionType): React.ReactNode => {
              const { id, category } = question;
              const title = Number(id).toString();
              return (
                <Navigator.Screen key={title} name={title} options={{ title, headerShown: false }}>
                  {(props) => (
                    <Question {...props} id={id} category={category} question={question.question} />
                  )}
                </Navigator.Screen>
              );
            })}
          </Navigator.Navigator>
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
