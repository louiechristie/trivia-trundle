import * as Linking from 'expo-linking';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Paragraph, useTheme } from 'react-native-paper';

const Credits = () => {
  const theme = useTheme();

  return (
    <>
      <Paragraph style={styles.credits}>Questions by The Open Trivia Database</Paragraph>
      <Paragraph
        style={[styles.credits, { color: theme.colors.primary, textDecorationLine: 'underline' }]}
        onPress={() => Linking.openURL('https://www.louiechristie.com')}>
        Game by www.LouieChristie.com
      </Paragraph>
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
