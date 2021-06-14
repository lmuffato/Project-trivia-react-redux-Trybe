export const LOGIN = 'LOGIN';
export const GET_QUESTIONS = 'GET_QUESTIONS';

export const login = (name, gravatarEmail) => ({
  type: LOGIN,
  payload: {
    name,
    gravatarEmail,
  },
});

export const getQuestions = (token, questions) => ({
  type: GET_QUESTIONS,
  payload: {
    token,
    questions,
  },
});
