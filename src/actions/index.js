import fetchQuestion from '../services/fetchQuestion';
import fetchToken from '../services/fetchToken';

export const START_FETCH = 'START_FETCH';
export const ADD_FILTER = 'ADD_FILTER';
export const ADD_PLAYER = 'ADD_PLAYER';
export const FETCH_TOKEN_SUCCESS = 'FETCH_TOKEN_SUCCESS';
export const FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCCESS';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const RIGHT_ANSWER = 'RIGHT_ANSWER';

function startFetch() {
  return { type: START_FETCH };
}

export function addPlayer(payload) {
  return {
    type: ADD_PLAYER,
    payload,
  };
}

export function addFilter(payload) {
  return {
    type: ADD_FILTER,
    payload,
  };
}

export function rightAnswer(payload) {
  return {
    type: RIGHT_ANSWER,
    payload,
  };
}

export function fetchTokenSuccess(payload) {
  return {
    type: FETCH_TOKEN_SUCCESS,
    payload,
  };
}

export function fetchQuestionsSuccess(payload) {
  return {
    type: FETCH_QUESTIONS_SUCCESS,
    payload,
  };
}

export function getQuestion(token) {
  return async (dispatch) => {
    dispatch(startFetch());
    const questions = await fetchQuestion(token);
    dispatch(fetchQuestionsSuccess(questions));
  };
}

export function getToken() {
  return async (dispatch) => {
    dispatch(startFetch());
    const token = await fetchToken();
    dispatch(fetchTokenSuccess(token));
    localStorage.setItem('token', token);
  };
}
