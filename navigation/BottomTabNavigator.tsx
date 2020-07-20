import { MaterialIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { withTheme } from 'react-native-paper';

import HomeScreen from '../screens/HomeScreen';
import QuestionsScreen from '../screens/QuestionsScreen';
import ResultsScreen from '../screens/ResultsScreen';

type MaterialBottomTabParams = {
  Home: undefined;
  Questions: undefined;
  Results: undefined;
};

type HomeParamList = {
  HomeScreen: undefined;
};

type QuestionsParamList = {
  QuestionsScreen: undefined;
};

type ResultsParamList = {
  ResultsScreen: undefined;
};

const BottomTab = createMaterialBottomTabNavigator<MaterialBottomTabParams>();

const BottomTabNavigator = (): JSX.Element => {
  return (
    <BottomTab.Navigator initialRouteName="Results">
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Questions"
        component={QuestionsNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="question-answer" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Results"
        component={ResultsNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="format-list-numbered" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
};

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <MaterialIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false, headerTitle: 'Home' }}
      />
    </HomeStack.Navigator>
  );
}

const QuestionsStack = createStackNavigator<QuestionsParamList>();

function QuestionsNavigator() {
  return (
    <QuestionsStack.Navigator>
      <QuestionsStack.Screen
        name="QuestionsScreen"
        component={QuestionsScreen}
        options={{ headerShown: false, headerTitle: 'Questions' }}
      />
    </QuestionsStack.Navigator>
  );
}

const ResultsStack = createStackNavigator<ResultsParamList>();

function ResultsNavigator() {
  return (
    <ResultsStack.Navigator>
      <ResultsStack.Screen
        name="ResultsScreen"
        component={ResultsScreen}
        options={{ headerShown: false, headerTitle: 'Results' }}
      />
    </ResultsStack.Navigator>
  );
}

export default withTheme(BottomTabNavigator);
