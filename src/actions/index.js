import { getToken, fetchAPI } from '../services/triviaApi';

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const ADD_QUESTIONS_SUCCESS = 'ADD_QUESTIONS';
export const ADD_QUESTIONS_ERROR = 'ADD_QUESTIONS_ERROR';
export const ADD_USER_LOGIN = 'ADD_USER_LOGIN';
export const CALCULATE_SCORE = 'CALCULATE_SCORE';
export const GET_ASSERTIONS = 'GET_ASSERTIONS';

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

export const fetchAPIThunk = () => async (dispatch) => {
  dispatch(getQuestions());
  try {
    const apiResponse = await getToken();
    const apiData = await fetchAPI(apiResponse);
    dispatch(addQuestionSuccess({
      apiResponse: apiData,
    }));
  } catch (error) {
    dispatch(addQuestionError({
      apiError: error,
    }));
  }
};
