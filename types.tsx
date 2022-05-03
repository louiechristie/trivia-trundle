import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack';

export type TrueOrFalse = 'True' | 'False';

export interface ServerResponse {
  data: ServerData;
}

export interface ServerData {
  response_code: number;
  results: rawQuestion[];
}
export type rawQuestion = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: TrueOrFalse;
  incorrect_answers: TrueOrFalse[];
};

export type Question = rawQuestion & {
  id: number;
  given_answer: null | TrueOrFalse;
  answered_correctly: null | boolean;
};

export type State = {
  questions: Question[];
  error: string | null;
  isLoading: boolean;
  score: number;
};

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const SET_QUESTION_ANSWER = 'SET_QUESTION_ANSWER';

export interface GetQuestionsAction {
  type: typeof GET_QUESTIONS;
  payload: {
    error: string | null;
    isLoading: boolean;
    questions: rawQuestion[];
  };
}

export interface SetQuestionAnswerAction {
  type: typeof SET_QUESTION_ANSWER;
  payload: {
    id: number;
    given_answer: TrueOrFalse;
  };
}

export type ActionTypes = GetQuestionsAction | SetQuestionAnswerAction;

export type RootStackParamList = {
  Home: undefined;
  Questions: undefined;
  Results: undefined;
};

export type DebugStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type QuestionsStackParamList = {
  '1': undefined;
  '2': undefined;
  '3': undefined;
  '4': undefined;
  '5': undefined;
  '6': undefined;
  '7': undefined;
  '8': undefined;
  '9': undefined;
  '10': undefined;
};

export type QuestionStackProps = NativeStackNavigationProp<QuestionsStackParamList>;

export type QuestionScreenNavigationProp = CompositeScreenProps<
  MaterialBottomTabScreenProps<RootStackParamList, 'Questions'>,
  NativeStackScreenProps<QuestionsStackParamList>
>;

export type ParamList = RootStackParamList | DebugStackParamList | QuestionsStackParamList;

// Fix to allow custom colors in react-native-paper theme
// See https://callstack.github.io/react-native-paper/theming.html#typescript
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNativePaper {
    interface ThemeColors {
      positive: string;
      negative: string;
      questionBackgroundColor: string;
      questionBorderColor: string;
      lightText: string;
    }
  }
}

// Fix to allow autocomplete useNavigation Hook
// See https://reactnavigation.org/blog/2021/08/14/react-navigation-6.0/#better-type-safety
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RootStackParamList {}
  }
}
