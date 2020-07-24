import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import * as React from 'react';
import { Appbar } from 'react-native-paper';

const Header = (): JSX.Element => {
  const { name, description } = Constants.manifest;
  const navigation = useNavigation();
  return (
    <Appbar.Header dark>
      <Appbar.Action icon="home" onPress={() => navigation.navigate('Home')} />
      <Appbar.Content title={name} subtitle={description} />
    </Appbar.Header>
  );
};

export default Header;
