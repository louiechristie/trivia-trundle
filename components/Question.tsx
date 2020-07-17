import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph, Avatar } from 'react-native-paper';

const Question = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          left={(props) => <Avatar.Icon {...props} icon="comment-question" />}
        />
        <Card.Content>
          <Title>Card title</Title>
          <Paragraph>Card content</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {},
});

export default Question;
