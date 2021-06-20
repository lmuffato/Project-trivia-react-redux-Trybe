import { getQuestions } from '../services/dataApi';

export const REQUEST_API = 'REQUEST_API';
export const REQUEST_API_SUCESS = 'REQUEST_API_SUCESS';
export const REQUEST_API_ERROR = 'REQUEST_API_ERROR';
export const INCREMENT_INDEX = 'INCREMENT_INDEX';
export const REFRESH_SHUFFLE = 'REFRESH_SHUFFLE';
export const CHANGE_ASSERTIONS = 'CHANGE_ASSERTIONS';
export const RESET_QUESTIONS_REDUCER = 'RESET_QUESTIONS_REDUCER';

export const requestQuestions = () => ({
  type: REQUEST_API,
});

export const requestQuestionsSucess = (payload) => ({
  type: REQUEST_API_SUCESS,
  payload,
});

export const requestQuestionsError = (payload) => ({
  type: REQUEST_API_ERROR,
  payload,
});

export const requestQuestionsThunk = (token) => async (dispatch) => {
  dispatch(requestQuestions());
  const answer = await getQuestions(token);
  try {
    dispatch(requestQuestionsSucess(answer.results));
  } catch (erro) {
    dispatch(requestQuestionsError(erro));
  }
};

export const incrementIndex = () => ({
  type: INCREMENT_INDEX,
});

export const refreshShuffle = (payload) => ({
  type: REFRESH_SHUFFLE,
  payload,
});

export const changeAssertions = () => ({
  type: CHANGE_ASSERTIONS,
});

export const resetQuestionReducer = () => ({
  type: RESET_QUESTIONS_REDUCER,
});
