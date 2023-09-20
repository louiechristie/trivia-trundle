import Constants from 'expo-constants';
import { decode } from 'html-entities';
import React, { useReducer, createContext } from 'react';

import questionsAPI from '../api/questionsAPI';
import {
  ServerResponse,
  rawQuestion,
  Question,
  State,
  GET_QUESTIONS,
  SET_QUESTION_ANSWER,
  ActionTypes,
  TrueOrFalse,
} from '../types';

// eslint-disable-next-line @typescript-eslint/no-var-requires

const DEBUG = Constants.expoConfig?.extra?.debug || false;

const initialState: State = {
  questions: [],
  error: null,
  isLoading: false,
  score: 0,
};

/**
 *
 * @param questions - Questions from API
 *
 * Decodes HTML entities in questions
 * Adds id value to each question for identifying questions in the app.
 *
 */
export const transformQuestions = (questions: rawQuestion[]): Question[] => {
  return questions?.map((question: rawQuestion, index: number): Question => {
    return (
      {
        id: index + 1,
        ...question,
        question: decode(question.question, { level: 'html5' }),
        given_answer: null,
        answered_correctly: null,
      } || []
    );
  });
};

export const questionReducer = (state: State, action: ActionTypes): State => {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        ...action.payload,
        questions: transformQuestions(action.payload.questions),
      };
    case SET_QUESTION_ANSWER: {
      const questions = state.questions.map((question) => {
        let updatedQuestion = { ...question };
        let answered_correctly;

        if (question.id === action.payload.id) {
          answered_correctly = action.payload.given_answer === question.correct_answer;
          updatedQuestion = {
            ...question,
            given_answer: action.payload.given_answer,
            answered_correctly,
          };
        }

        return updatedQuestion;
      });

      const score = questions.reduce(
        (sum, question) => sum + (question.answered_correctly ? 1 : 0),
        0
      );

      return {
        ...state,
        questions,
        score,
      };
    }
    default:
      return state;
  }
};

type ContextType = {
  state: State;
  getQuestions: () => void;
  setQuestionAnswer: (id: number, given_answer: TrueOrFalse) => void;
};

export const Context = createContext<ContextType>({
  state: initialState,
  getQuestions: () => {
    // eslint-disable-next-line no-console
    console.error('Error: getQuestions() used outside a Provider, must be used within a provider.');
  },
  setQuestionAnswer: () => {
    // eslint-disable-next-line no-console
    console.error(
      'Error: setQuestionAnswer() used outside a Provider, must be used within a provider.'
    );
  },
});

export const Provider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(questionReducer, initialState);

  const getQuestions = async () => {
    if (DEBUG) {
      // eslint-disable-next-line no-console
      console.log(`getQuestions`);
    }

    let response: ServerResponse;
    const error = null;
    let isLoading = true;

    dispatch({
      type: GET_QUESTIONS,
      payload: {
        questions: [],
        error,
        isLoading,
      },
    });

    try {
      response = await questionsAPI.get('');

      const { data } = response;

      isLoading = false;

      if (DEBUG) {
        // eslint-disable-next-line no-console
        console.log(`response: ${JSON.stringify(response, null, 2)}`);
        // eslint-disable-next-line no-console
        console.log(`data: ${JSON.stringify(data, null, 2)}`);
      }

      dispatch({
        type: GET_QUESTIONS,
        payload: {
          questions: data?.results || [],
          error,
          isLoading,
        },
      });
    } catch (err) {
      isLoading = false;

      if (DEBUG) {
        // eslint-disable-next-line no-console
        console.log(`get_questions err: ${err}`);
      }

      dispatch({
        type: GET_QUESTIONS,
        payload: {
          questions: [],
          error:
            'Sorry, there was a problem downloading questions. Please check you are connected to the internet and try again.',
          isLoading,
        },
      });
    }
  };

  const setQuestionAnswer = (id: number, given_answer: TrueOrFalse) => {
    dispatch({
      type: SET_QUESTION_ANSWER,
      payload: { id, given_answer },
    });
  };

  return (
    <Context.Provider
      value={{
        state,
        getQuestions,
        setQuestionAnswer,
      }}>
      {children}
    </Context.Provider>
  );
};
