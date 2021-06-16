export const LOGIN = 'LOGIN';

const login = (name, email) => ({
  type: 'LOGIN',
  name,
  email,
});

export const timer = (tempo) => ({
  type: 'TIMER',
  tempo,
});

export const setScore = (score) => ({
  type: 'SCORE',
  score,
});

export default login;

export const setQuestions = (questions) => ({ type: 'SET_QUESTIONS', questions });
