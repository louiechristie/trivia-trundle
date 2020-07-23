import Constants from 'expo-constants';

import questionsAPI from '../api/questionsAPI';
import { Question, State, GET_QUESTIONS, SET_QUESTION_ANSWER, ActionTypes } from '../types';
import createDataContext from './createDataContext';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

const DEBUG = Constants.manifest.extra.debug || false;

const initialState = {
  questions: [],
  error: null,
  isLoading: false,
};

/**
 *
 * @param questions Questions from API
 *
 * Decodes HTML entities in questions
 * Adds id value to each question for identifying questions in the app.
 *
 */
const transformQuestions = (questions: Question[]): Question[] => {
  return questions?.map(
    (question: Question, index: number): Question => {
      return (
        {
          id: index + 1,
          ...question,
          question: entities.decode(question.question),
          given_answer: null,
          answered_correctly: null,
        } || []
      );
    }
  );
  // return (
  //   questions?.map((question, id) => {
  //     return {
  //       id,
  //       ...question,
  //     };
  //   }) || []
  // );
};

const questionReducer = (state: State, action: ActionTypes): State => {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        ...action.payload,
        questions: transformQuestions(action.payload.questions),
      };
    case SET_QUESTION_ANSWER:
      return {
        ...state,
        questions: state.questions.map((question) => {
          return {
            ...question,
            given_answer: question.id === action.payload.id ? action.payload.given_answer : null,
            answered_correctly: action.payload.given_answer === question.correct_answer,
          };
        }),
      };
    default:
      return state;
  }
};

const getQuestions = (dispatch) => {
  return async () => {
    let response = null;
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
      isLoading = false;

      if (DEBUG) {
        console.log(`response: ${JSON.stringify(response, null, 2)}`);
        console.log(`response.data: ${JSON.stringify(response.data, null, 2)}`);
      }

      dispatch({
        type: GET_QUESTIONS,
        payload: {
          questions: response?.data?.results || [],
          error,
          isLoading,
        },
      });
    } catch (err) {
      isLoading = false;

      if (DEBUG) {
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
};

const setQuestionAnswer = (dispatch) => {
  return (id, given_answer) => {
    dispatch({
      type: SET_QUESTION_ANSWER,
      payload: { id, given_answer },
    });
  };
};

export const { Context, Provider } = createDataContext(
  questionReducer,
  { getQuestions, setQuestionAnswer },
  initialState
);
