import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import type { ParamListBase } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';

import TabTwoScreen from '../screens/TabTwoScreen';

type MaterialTopTabParams = {
  1: undefined;
  2: undefined;
  3: undefined;
};

const MaterialTopTabs = createMaterialTopTabNavigator<MaterialTopTabParams>();

export default function MaterialTopTabsScreen({ navigation }: StackScreenProps<ParamListBase>) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      cardStyle: { flex: 1 },
    });
  }, [navigation]);

  return (
    <MaterialTopTabs.Navigator>
      <MaterialTopTabs.Screen name="1" component={TabTwoScreen} options={{ title: '1' }} />
      <MaterialTopTabs.Screen name="2" component={TabTwoScreen} options={{ title: '2' }} />
      <MaterialTopTabs.Screen name="3" component={TabTwoScreen} options={{ title: '3' }} />
    </MaterialTopTabs.Navigator>
  );
}
