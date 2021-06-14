import fetchQuestion from '../services/fetchQuestion';
import fetchToken from '../services/fetchToken';

export const START_FETCH = 'START_FETCH';
export const FETCH_TOKEN_SUCCESS = 'FETCH_TOKEN_SUCCESS';
export const FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCCESS';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';

function startFetch() {
  return { type: START_FETCH };
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
    console.log(questions);
    dispatch(fetchQuestionsSuccess(questions));
  }
}

export function getToken() {
  return async (dispatch) => {
    dispatch(startFetch());
    const token = await fetchToken();
    dispatch(fetchTokenSuccess(token));
  };
}
