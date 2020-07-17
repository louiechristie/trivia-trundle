import Constants from 'expo-constants';

import jsonServer from '../api/jsonServer';
import createDataContext from './createDataContext';

const DEBUG = Constants.manifest.extra.debug || false;

const questionReducer = (state, action) => {
  switch (action.type) {
    case 'get_questions':
      return action.payload;
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
    const response = await jsonServer.get();

    if (DEBUG) {
      console.log(`response: ${JSON.stringify(response, null, 2)}`);
      console.log(`response.data: ${JSON.stringify(response.data, null, 2)}`);
    }

    dispatch({ type: 'get_questions', payload: response.data?.results });
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
    if (callback) {
      callback();
    }
  };
};

export const { Context, Provider } = createDataContext(
  questionReducer,
  { addQuestion, deleteQuestion, editQuestion, getQuestions },
  []
);
