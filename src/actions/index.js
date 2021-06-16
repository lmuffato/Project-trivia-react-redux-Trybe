import getApiToken from '../services/api';

export const setNameAction = (nome) => ({
  type: 'SET_NAME',
  payload: {
    nome,
  },
});

export const setEmailAction = (email) => ({
  type: 'SET_EMAIL',
  payload: {
    email,
  },
});

// ------- QUESTION API REQUESTS -----------

export const getApiQuestionsSuccess = (payload) => ({
  type: 'API_SUCCESS',
  payload,
});

export const getApiQuestionsError = (payload) => ({
  type: 'API_ERROR',
  payload: {
    payload,
  },
});

// ----------- thunk --------------

export const getApiQuestionsThunk = () => async (dispatch) => {
  getApiToken();
  const codeError = 3;
  const token = JSON.parse(localStorage.getItem('token')) || [];
  const resolve = await fetch(`https://opentdb.com/api.php?amount=5&token=${token.token}`);
  const result = await resolve.json();
  if (result.response_code === codeError) {
    const validadeCode = await fetch(`https://opentdb.com/api.php?amount=5&token=${token.token}`);
    const questions = await validadeCode.json();
    return questions;
  }

  try {
    dispatch(getApiQuestionsSuccess(result.results));
  } catch (e) {
    dispatch(getApiQuestionsError());
  }
};
