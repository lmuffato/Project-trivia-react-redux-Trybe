import { fetchAPI } from '../services/triviaApi';
import { getItemFromLocalStorage } from '../services/storage';

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const ADD_QUESTIONS_SUCCESS = 'ADD_QUESTIONS';
export const ADD_QUESTIONS_ERROR = 'ADD_QUESTIONS_ERROR';
export const ADD_USER_LOGIN = 'ADD_USER_LOGIN';
export const CALCULATE_SCORE = 'CALCULATE_SCORE';
export const GET_ASSERTIONS = 'GET_ASSERTIONS';
export const TIMEOUT = 'TIMEOUT';
export const TIMEIN = 'TIMEIN';

export const getQuestions = () => ({
  type: GET_QUESTIONS,
});

export const addQuestionSuccess = (payload) => ({
  type: ADD_QUESTIONS_SUCCESS,
  payload,
});

export const addQuestionError = (payload) => ({
  type: ADD_QUESTIONS_ERROR,
  payload,
});

export const userLoginAction = (payload) => ({
  type: ADD_USER_LOGIN,
  payload,
});

export const calculateScore = (payload) => ({
  type: CALCULATE_SCORE,
  payload,
});

export const getAssertions = (payload) => ({
  type: GET_ASSERTIONS,
  payload,
});

export const timeOut = () => ({
  type: TIMEOUT,
});

export const timein = () => ({
  type: TIMEIN,
});

export const fetchAPIThunk = () => async (dispatch) => {
  // dispatch(getQuestions());
  try {
    const token = getItemFromLocalStorage('token');

    const apiData = await fetchAPI(token);
    dispatch(addQuestionSuccess(apiData));
  } catch (error) {
    dispatch(addQuestionError({
      apiError: error,
    }));
  }
};
