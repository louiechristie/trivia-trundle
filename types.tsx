export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type question = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};
