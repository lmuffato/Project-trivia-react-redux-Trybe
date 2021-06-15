import { MD5 } from 'crypto-js';
import { LOGIN, GET_QUESTIONS,
  API_GRAVATAR, GET_GRAVATAR, API_TRIVIA_QUESTIONS } from '../constants';

export const login = (payload) => ({ type: LOGIN, payload });

export const getGravatarImage = (email) => ({
  type: GET_GRAVATAR,
  payload: API_GRAVATAR(MD5(email).toString()),
});

const getQuestions = (payload) => ({ type: GET_QUESTIONS, payload });

export const startNewGame = (amount, token) => (dispatch) => {
  fetch(API_TRIVIA_QUESTIONS(amount, token))
    .then((response) => response.json())
    .then((data) => dispatch(getQuestions(data)));
};
