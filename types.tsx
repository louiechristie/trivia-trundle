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

export type ParamList = RootStackParamList | DebugStackParamList;

// Fix to allow custom colors in react-native-paper theme
// See https://callstack.github.io/react-native-paper/theming.html#typescript
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNativePaper {
    interface ThemeColors {
      positive: string;
      negative: string;
      questionBackgroundColor: string;
      lightText: string;
    }
  }
}
