import { MaterialIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import HomeScreen from '../screens/HomeScreen';
import QuestionsScreen from '../screens/QuestionsScreen';
import ResultsScreen from '../screens/ResultsScreen';
import { QuestionsStackParamList } from '../types';

type MaterialIconName = React.ComponentProps<typeof MaterialIcons>['name'];

type MaterialBottomTabParams = {
  Home: undefined;
  Questions: undefined;
  Results: undefined;
};

type HomeParamList = {
  HomeScreen: undefined;
};

type ResultsParamList = {
  ResultsScreen: undefined;
};

const BottomTab = createMaterialBottomTabNavigator<MaterialBottomTabParams>();

export default function BottomTabNavigator(): JSX.Element {
  return (
    <BottomTab.Navigator initialRouteName="Home">
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
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: MaterialIconName; color: string }) {
  return <MaterialIcons size={28} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createNativeStackNavigator<HomeParamList>();

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

const QuestionsStack = createNativeStackNavigator<QuestionsStackParamList>();

function QuestionsNavigator() {
  return (
    <QuestionsStack.Navigator>
      <QuestionsStack.Screen
        name="1"
        component={QuestionsScreen}
        options={{ headerShown: false, headerTitle: 'Questions' }}
      />
    </QuestionsStack.Navigator>
  );
}

const ResultsStack = createNativeStackNavigator<ResultsParamList>();

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
