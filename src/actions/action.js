import { MD5 } from 'crypto-js';
import { LOGIN, SET_QUESTIONS,
  API_GRAVATAR, SET_GRAVATAR, API_TRIVIA_QUESTIONS, GAME_TIMEOUT,
  SET_CURRENT_QUESTION_TIME, REQUEST_QUESTIONS, UPDATE_SCORE } from '../constants';

export const login = (payload) => ({ type: LOGIN, payload });

export const getGravatarImage = (email) => ({
  type: SET_GRAVATAR,
  payload: API_GRAVATAR(MD5(email).toString()),
});

export const gameTimeout = () => ({ type: GAME_TIMEOUT });
export const currentQuestionTime = (payload) => (
  { type: SET_CURRENT_QUESTION_TIME, payload });

const setQuestions = (payload) => ({ type: SET_QUESTIONS, payload });
const requestAPIQuestions = () => ({ type: REQUEST_QUESTIONS });

export const startNewGame = (amount, token) => (dispatch) => {
  dispatch(requestAPIQuestions());
  fetch(API_TRIVIA_QUESTIONS(amount, token))
    .then((response) => response.json())
    .then((data) => dispatch(setQuestions(data)));
};

export const updateScore = (payload) => ({ type: UPDATE_SCORE, payload });
