import { StackScreenProps } from '@react-navigation/stack';
import Constants from 'expo-constants';
import React, { useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { List, Title, Paragraph, ActivityIndicator, useTheme, Button } from 'react-native-paper';

import Header from '../components/Header';
import { Context } from '../context/QuestionsContext';
import { Question, RootStackParamList } from '../types';

const DEBUG = Constants.manifest.extra.debug || false;

type Props = StackScreenProps<RootStackParamList, 'Results'>;

export default function ResultsScreen({ navigation }: Props): JSX.Element {
  const { state } = useContext(Context);
  const theme = useTheme();
  const {
    colors: { positive, negative },
  } = theme;
  const { questions, score, error, isLoading } = state;

  const showInfoBox = questions.length === 0 || error !== null || isLoading === true;

  const playAgain = () => {
    navigation.navigate('Home');
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}>
      <Header />

      {showInfoBox ? (
        <View style={styles.inner}>
          <View style={styles.empty}>
            {isLoading && <ActivityIndicator />}
            <Paragraph>No results to display.</Paragraph>
            {error && <Paragraph>{error}</Paragraph>}
            {DEBUG && (
              <Paragraph style={styles.debug}>State: {JSON.stringify(state, null, 2)}</Paragraph>
            )}
          </View>
        </View>
      ) : (
        <View style={styles.results}>
          <Title style={styles.title}>You scored</Title>
          <Title style={styles.title}>{score} / 10</Title>

          <List.Section theme={theme}>
            {isLoading && <ActivityIndicator />}

            {questions.map((question: Question) => {
              const { answered_correctly, given_answer } = question;
              if (given_answer === null) return null;
              return (
                <List.Item
                  key={Number(question.id).toString()}
                  left={(props) => {
                    return (
                      <List.Icon
                        {...props}
                        icon={answered_correctly ? 'plus' : 'minus'}
                        color={answered_correctly ? positive : negative}
                      />
                    );
                  }}
                  title={question.question}
                  description={`${
                    answered_correctly ? "Correct, it's" : "Incorrect, it's actually"
                  } ${question.correct_answer}.`}
                  titleNumberOfLines={5}
                />
              );
            })}
          </List.Section>
        </View>
      )}
      <Button
        mode="contained"
        style={styles.button}
        contentStyle={styles.buttonContent}
        onPress={playAgain}>
        PLAY AGAIN?
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: DEBUG ? 2 : 0,
    borderColor: 'red',
  },
  contentContainer: {
    flexGrow: 1,
    borderWidth: DEBUG ? 2 : 0,
    borderColor: 'orange',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: DEBUG ? 2 : 0,
    borderColor: 'yellow',
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
  results: {
    borderWidth: DEBUG ? 2 : 0,
    borderColor: 'yellow',
  },
  row: {
    flexDirection: 'row',
    borderWidth: DEBUG ? 1 : 0,
    borderColor: 'green',
  },
  column: {
    flexDirection: 'column',
    borderWidth: DEBUG ? 1 : 0,
    borderColor: 'blue',
  },
  title: {
    textAlign: 'center',
    borderWidth: DEBUG ? 1 : 0,
    borderColor: 'indigo',
  },
  button: {
    margin: 60,
    marginTop: 20,
  },
  buttonContent: {
    height: 60,
  },
  debug: { paddingTop: 10 },
});
