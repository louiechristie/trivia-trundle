import * as Linking from 'expo-linking';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import type { AppTheme } from '../constants/Colors';

const Credits = () => {
  const theme = useTheme<AppTheme>();

  return (
    <>
      <Text variant="bodyMedium" style={styles.credits}>
        Questions by The Open Trivia Database
      </Text>
      <Text
        variant="bodyMedium"
        style={[styles.credits, { color: theme.colors.primary, textDecorationLine: 'underline' }]}
        onPress={() => Linking.openURL('https://www.louiechristie.com')}>
        Game by www.LouieChristie.com
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  credits: {
    textAlign: 'center',
    paddingBottom: 10,
  },
});

export default Credits;
