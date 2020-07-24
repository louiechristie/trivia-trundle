import { SET_QUESTION_ANSWER, State, ActionTypes } from '../types';
import { transformQuestions, questionReducer } from './QuestionsContext';

test('transformQuestions add keys id, given_answer, and answered_correctly', () => {
  expect(
    transformQuestions([
      {
        category: 'History',
        type: 'boolean',
        difficulty: 'hard',
        question: 'Japan was part of the Allied Powers during World War I.',
        correct_answer: 'True',
        incorrect_answers: ['False'],
      },
    ])
  ).toMatchObject([
    {
      id: 1,
      category: 'History',
      type: 'boolean',
      difficulty: 'hard',
      question: 'Japan was part of the Allied Powers during World War I.',
      correct_answer: 'True',
      incorrect_answers: ['False'],
      given_answer: null,
      answered_correctly: null,
    },
  ]);
});

test('transformQuestions decode quotes', () => {
  expect(
    transformQuestions([
      {
        category: 'Entertainment: Video Games',
        type: 'boolean',
        difficulty: 'hard',
        question:
          'In Undertale, having a &quot;Fun Value&quot; set to 56-57 will play the &quot;Wrong Number Song Call&quot;.',
        correct_answer: 'False',
        incorrect_answers: ['True'],
      },
    ])
  ).toMatchObject([
    {
      id: 1,
      category: 'Entertainment: Video Games',
      type: 'boolean',
      difficulty: 'hard',
      question: `In Undertale, having a "Fun Value" set to 56-57 will play the "Wrong Number Song Call".`,
      correct_answer: 'False',
      incorrect_answers: ['True'],
      given_answer: null,
      answered_correctly: null,
    },
  ]);
});

test('transformQuestions decode &Aring; to Å', () => {
  expect(
    transformQuestions([
      {
        category: 'General Knowledge',
        type: 'boolean',
        difficulty: 'hard',
        question: 'In Scandinavian languages, the letter &Aring; means river.',
        correct_answer: 'True',
        incorrect_answers: ['False'],
      },
    ])
  ).toMatchObject([
    {
      id: 1,
      category: 'General Knowledge',
      type: 'boolean',
      difficulty: 'hard',
      question: 'In Scandinavian languages, the letter Å means river.',
      correct_answer: 'True',
      incorrect_answers: ['False'],
      given_answer: null,
      answered_correctly: null,
    },
  ]);
});

test('questionReducer SET_QUESTION_ANSWER answer True which is correct answer', () => {
  const initialState: State = {
    questions: [
      {
        id: 1,
        category: 'General Knowledge',
        type: 'boolean',
        difficulty: 'hard',
        question: 'In Scandinavian languages, the letter Å means river.',
        correct_answer: 'True',
        incorrect_answers: ['False'],
        given_answer: null,
        answered_correctly: null,
      },
    ],
    error: null,
    isLoading: false,
  };

  const action: ActionTypes = {
    type: SET_QUESTION_ANSWER,
    payload: { id: 1, given_answer: 'True' },
  };

  const expectedState: State = {
    questions: [
      {
        id: 1,
        category: 'General Knowledge',
        type: 'boolean',
        difficulty: 'hard',
        question: 'In Scandinavian languages, the letter Å means river.',
        correct_answer: 'True',
        incorrect_answers: ['False'],
        given_answer: 'True',
        answered_correctly: true,
      },
    ],
    error: null,
    isLoading: false,
  };

  expect(questionReducer(initialState, action)).toMatchObject(expectedState);
});

test('questionReducer SET_QUESTION_ANSWER answer False which is incorrect answer', () => {
  const initialState: State = {
    questions: [
      {
        id: 1,
        category: 'General Knowledge',
        type: 'boolean',
        difficulty: 'hard',
        question: 'In Scandinavian languages, the letter Å means river.',
        correct_answer: 'True',
        incorrect_answers: ['False'],
        given_answer: null,
        answered_correctly: null,
      },
    ],
    error: null,
    isLoading: false,
  };

  const action: ActionTypes = {
    type: SET_QUESTION_ANSWER,
    payload: { id: 1, given_answer: 'False' },
  };

  const expectedState: State = {
    questions: [
      {
        id: 1,
        category: 'General Knowledge',
        type: 'boolean',
        difficulty: 'hard',
        question: 'In Scandinavian languages, the letter Å means river.',
        correct_answer: 'True',
        incorrect_answers: ['False'],
        given_answer: 'False',
        answered_correctly: false,
      },
    ],
    error: null,
    isLoading: false,
  };
  expect(questionReducer(initialState, action)).toMatchObject(expectedState);
});

test('questionReducer SET_QUESTION_ANSWER answer True which is incorrect answer', () => {
  const initialState: State = {
    questions: [
      {
        id: 2,
        category: 'Entertainment: Video Games',
        type: 'boolean',
        difficulty: 'hard',
        question: `In Undertale, having a "Fun Value" set to 56-57 will play the "Wrong Number Song Call".`,
        correct_answer: 'False',
        incorrect_answers: ['True'],
        given_answer: null,
        answered_correctly: null,
      },
    ],
    error: null,
    isLoading: false,
  };

  const action: ActionTypes = {
    type: SET_QUESTION_ANSWER,
    payload: { id: 2, given_answer: 'True' },
  };

  const expectedState: State = {
    questions: [
      {
        id: 2,
        category: 'Entertainment: Video Games',
        type: 'boolean',
        difficulty: 'hard',
        question: `In Undertale, having a "Fun Value" set to 56-57 will play the "Wrong Number Song Call".`,
        correct_answer: 'False',
        incorrect_answers: ['True'],
        given_answer: 'True',
        answered_correctly: false,
      },
    ],
    error: null,
    isLoading: false,
  };

  expect(questionReducer(initialState, action)).toMatchObject(expectedState);
});

test('questionReducer SET_QUESTION_ANSWER answer True which is correct answer', () => {
  const initialState: State = {
    questions: [
      {
        id: 2,
        category: 'History',
        type: 'boolean',
        difficulty: 'hard',
        question: 'Japan was part of the Allied Powers during World War I.',
        correct_answer: 'True',
        incorrect_answers: ['False'],
        given_answer: null,
        answered_correctly: null,
      },
    ],
    error: null,
    isLoading: false,
  };

  const action: ActionTypes = {
    type: SET_QUESTION_ANSWER,
    payload: { id: 2, given_answer: 'True' },
  };

  const expectedState: State = {
    questions: [
      {
        id: 2,
        category: 'History',
        type: 'boolean',
        difficulty: 'hard',
        question: 'Japan was part of the Allied Powers during World War I.',
        correct_answer: 'True',
        incorrect_answers: ['False'],
        given_answer: 'True',
        answered_correctly: true,
      },
    ],
    error: null,
    isLoading: false,
  };

  expect(questionReducer(initialState, action)).toMatchObject(expectedState);
});
