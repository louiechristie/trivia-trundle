import Constants from 'expo-constants';

import questionsAPI from '../api/questionsAPI';
import { question } from '../types';
import createDataContext from './createDataContext';

export type action = 'get_questions';

export type state = {
  questions: {
    questions: question[];
    error: string;
    isLoading: boolean;
  };
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

const DEBUG = Constants.manifest.extra.debug || false;

const questionReducer = (state: state, action: action): state => {
  switch (action.type) {
    case 'get_questions':
      return {
        ...action.payload,
        // decode HTML entities
        questions:
          action.payload.questions?.map(
            (question: question): question => {
              return {
                ...question,
                question: entities.decode(question?.question),
              };
            }
          ) || [],
      };

    case 'edit_question':
      return state.map((questionPost) => {
        return questionPost.id === action.payload.id ? action.payload : questionPost;
      });
    case 'delete_question':
      return state.filter((questionPost) => questionPost.id !== action.payload);
    case 'add_question':
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 99999),
          title: action.payload.title,
          content: action.payload.content,
        },
      ];
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
      type: 'get_questions',
      payload: {
        questions: [],
        error,
        isLoading,
      },
    });

    try {
      await setTimeout(null, 4000);
      response = await questionsAPI.get('');
      isLoading = false;

      if (DEBUG) {
        console.log(`response: ${JSON.stringify(response, null, 2)}`);
        console.log(`response.data: ${JSON.stringify(response.data, null, 2)}`);
      }

      dispatch({
        type: 'get_questions',
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
        type: 'get_questions',
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

const addQuestion = (dispatch) => {
  return (title, content, callback) => {
    dispatch({ type: 'add_question', payload: { title, content } });
    if (callback) {
      callback();
    }
  };
};
const deleteQuestion = (dispatch) => {
  return (id) => {
    dispatch({ type: 'delete_question', payload: id });
  };
};
const editQuestion = (dispatch) => {
  return (id, title, content) => {
    dispatch({
      type: 'edit_question',
      payload: { id, title, content },
    });
  };
};

export const { Context, Provider } = createDataContext(
  questionReducer,
  { addQuestion, deleteQuestion, editQuestion, getQuestions },
  []
);
