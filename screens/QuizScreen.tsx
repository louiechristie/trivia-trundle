import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import type { ParamListBase } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { withTheme } from 'react-native-paper';

import Header from '../components/Header';
import Question from '../components/Question';

type MaterialTopTabParams = {
  '1': undefined;
  '2': undefined;
  '3': undefined;
};

const MaterialTopTabs = createMaterialTopTabNavigator<MaterialTopTabParams>();

function QuizScreen({
  navigation,
  theme: {
    colors: { quiz },
  },
}: StackScreenProps<ParamListBase>) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      cardStyle: { flex: 1 },
    });
  }, [navigation]);

  return (
    <ScrollView style={[styles.container, { backgroundColor: quiz }]}>
      <Header />
      <MaterialTopTabs.Navigator>
        <MaterialTopTabs.Screen name="1" component={Question} options={{ title: '1' }} />
        <MaterialTopTabs.Screen name="2" component={Question} options={{ title: '2' }} />
        <MaterialTopTabs.Screen name="3" component={Question} options={{ title: '3' }} />
      </MaterialTopTabs.Navigator>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 4,
  },
  card: {
    margin: 4,
  },
});

export default withTheme(QuizScreen);
