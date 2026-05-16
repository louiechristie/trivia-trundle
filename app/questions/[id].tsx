import { useLocalSearchParams } from 'expo-router';
import React from 'react';

import QuestionsScreen from '../../screens/QuestionsScreen';

export default function QuestionRoute(): React.JSX.Element {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <QuestionsScreen id={Number(id)} />;
}
