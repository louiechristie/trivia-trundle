import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import QuizScreen from '../screens/QuizScreen';
import ResultsScreen from '../screens/ResultsScreen';
import HomeScreen from '../screens/TabTwoScreen';

type MaterialBottomTabParams = {
  Home: undefined;
  Quiz: undefined;
  Results: undefined;
};

type HomeParamList = {
  HomeScreen: undefined;
};

type QuizParamList = {
  QuizScreen: undefined;
};

type ResultsParamList = {
  ResultsScreen: undefined;
};

const BottomTab = createBottomTabNavigator<MaterialBottomTabParams>();

export default function BottomTabNavigator(): JSX.Element {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Results"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Quiz"
        component={QuizNavigator}
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
        options={{ headerTitle: 'Home' }}
      />
    </HomeStack.Navigator>
  );
}

const QuizStack = createStackNavigator<QuizParamList>();

function QuizNavigator() {
  return (
    <QuizStack.Navigator>
      <QuizStack.Screen
        name="QuizScreen"
        component={QuizScreen}
        options={{ headerTitle: 'Quiz' }}
      />
    </QuizStack.Navigator>
  );
}

const ResultsStack = createStackNavigator<ResultsParamList>();

function ResultsNavigator() {
  return (
    <ResultsStack.Navigator>
      <ResultsStack.Screen
        name="ResultsScreen"
        component={ResultsScreen}
        options={{ headerTitle: 'Results' }}
      />
    </ResultsStack.Navigator>
  );
}
