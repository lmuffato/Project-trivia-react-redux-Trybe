export const LOGIN = 'LOGIN';

const login = (name, email) => ({
  type: 'LOGIN',
  name,
  email,
});

export default login;

export const setQuestions = (questions) => ({ type: 'SET_QUESTIONS', questions });
