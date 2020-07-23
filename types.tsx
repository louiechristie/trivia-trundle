export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type TrueOrFalse = 'True' | 'False';

export type Question = {
  id?: number;
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: TrueOrFalse;
  incorrect_answers: TrueOrFalse[];
  given_answer?: null | TrueOrFalse;
  answered_correctly?: null | boolean;
};

export type State = {
  questions: Question[];
  error: string;
  isLoading: boolean;
};

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const SET_QUESTION_ANSWER = 'SET_QUESTION_ANSWER';

interface GetQuestionsAction {
  type: typeof GET_QUESTIONS;
  payload: {
    error: string;
    isLoading: boolean;
    questions: Question[];
  };
}

interface SetQuestionAnswerAction {
  type: typeof SET_QUESTION_ANSWER;
  payload: {
    index: number;
    given_answer: TrueOrFalse;
  };
}

export type ActionTypes = GetQuestionsAction | SetQuestionAnswerAction;
