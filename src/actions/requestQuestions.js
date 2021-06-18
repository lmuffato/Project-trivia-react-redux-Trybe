import { getQuestions } from '../services/dataApi';

export const REQUEST_API = 'REQUEST_API';
export const REQUEST_API_SUCESS = 'REQUEST_API_SUCESS';
export const REQUEST_API_ERROR = 'REQUEST_API_ERROR';

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
