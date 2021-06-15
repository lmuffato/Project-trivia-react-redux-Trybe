import { getQuestions } from '../../services/triviaAPI';

export const GET_LOGIN = 'GET_LOGIN';
export const GET_API_SUCCESS = 'GET_API_SUCCESS';
export const GET_API_ERROR = 'GET_API_ERROR';
export const GET_API = 'GET_API';

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

export const getAPIThunk = () => (dispatch) => {
  dispatch(getAPI());

  try {
    const fetch = getQuestions();
    dispatch(getAPISuccess(fetch));
  } catch (error) {
    dispatch(getAPIError(error));
  }
};

export default getAPI;
