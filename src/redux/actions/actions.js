import { getQuestions } from '../../services/triviaAPI';
import shuffle from '../../helpers/shuffle';

export const GET_LOGIN = 'GET_LOGIN';
export const GET_API_SUCCESS = 'GET_API_SUCCESS';
export const GET_API_ERROR = 'GET_API_ERROR';
export const GET_API = 'GET_API';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const SAVE_TIME = 'SAVE_TIME';

export const user = (payload) => ({
  type: GET_LOGIN,
  payload,
});

const getAPI = () => ({
  type: GET_API,
});

export const getAPISuccess = (payload) => ({
  type: GET_API_SUCCESS,
  payload,
});

export const getAPIError = (payload) => ({
  type: GET_API_ERROR,
  payload,
});

export const getAPIThunk = () => async (dispatch) => {
  dispatch(getAPI());

  try {
    const fetch = await getQuestions();

    const questions = fetch.map((question) => ({ ...question,
      aleatory_answers: shuffle([
        ...question.incorrect_answers,
        question.correct_answer]) }));

    dispatch(getAPISuccess(questions));
  } catch (error) {
    dispatch(getAPIError(error));
  }
};

export const updateScore = (payload) => ({
  type: UPDATE_SCORE,
  payload,
});

export const saveTime = (payload) => ({
  type: SAVE_TIME,
  payload,
});

export default getAPI;
