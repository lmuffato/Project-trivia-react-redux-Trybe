import { fetchAPI } from '../services/triviaApi';
import { getItemFromLocalStorage } from '../services/storage';

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const ADD_QUESTIONS_SUCCESS = 'ADD_QUESTIONS';
export const ADD_QUESTIONS_ERROR = 'ADD_QUESTIONS_ERROR';
export const ADD_USER_LOGIN = 'ADD_USER_LOGIN';
export const CALCULATE_SCORE = 'CALCULATE_SCORE';
export const ADD_ASSERTIONS = 'ADD_ASSERTIONS';
export const TIMEOUT = 'TIMEOUT';
export const TIMEIN = 'TIMEIN';
export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const SELECT_TYPE = 'SELECT_TYPE';
export const SELECT_DIFICULTE = 'SELECT_DIFICULTE';
export const RESET = 'RESET';

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

export const addAssertions = () => ({
  type: ADD_ASSERTIONS,
});

export const timeOut = () => ({
  type: TIMEOUT,
});

export const timeIn = () => ({
  type: TIMEIN,
});

export const categoryAction = (payload) => ({
  type: SELECT_CATEGORY,
  payload,
});

export const dificulteAction = (payload) => ({
  type: SELECT_DIFICULTE,
  payload,
});

export const typeAction = (payload) => ({
  type: SELECT_TYPE,
  payload,
});

export const reset = () => ({
  type: RESET,
});

export const fetchAPIThunk = (category, dificulty, type) => async (dispatch) => {
  // dispatch(getQuestions());
  try {
    const token = getItemFromLocalStorage('token');

    const apiData = await fetchAPI(token, category, dificulty, type);
    dispatch(addQuestionSuccess(apiData));
  } catch (error) {
    dispatch(addQuestionError({
      apiError: error,
    }));
  }
};
