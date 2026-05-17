import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { Appbar } from 'react-native-paper';

import Colors from '../constants/Colors';

const Header = (): React.JSX.Element => {
  const description = Constants.expoConfig?.description;
  const name = Constants.expoConfig?.name;
  const router = useRouter();
  return (
    <Appbar.Header dark style={{ backgroundColor: Colors.light.colors.primary }}>
      <Appbar.Action icon="home" onPress={() => router.push('/')} />
      <Appbar.Content title={name} subtitle={description} />
    </Appbar.Header>
  );
};

export default Header;
