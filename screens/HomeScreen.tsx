import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Title } from 'react-native-paper';

import Header from '../components/Header';

export default function HomeScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Title>Welcome</Title>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
