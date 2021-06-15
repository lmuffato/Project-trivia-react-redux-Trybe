import fetchToken from '../../services/fetchToken';

export const LOGIN = 'LOGIN';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const GET_TOKEN = 'GET_TOKEN';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';

export const login = (name, gravatarEmail) => ({
  type: LOGIN,
  payload: {
    name,
    gravatarEmail,
  },
});

export const getQuestions = (token, questions) => ({
  type: GET_QUESTIONS,
  payload: {
    token,
    questions,
  },
});

export const getToken = () => ({
  type: GET_TOKEN,
});

export const getTokenSuccessfull = (payload) => ({
  type: GET_TOKEN_SUCCESS,
  payload,
});

export const getTokenThunk = () => (dispatch) => {
  dispatch(getToken());
  fetchToken()
    .then((response) => dispatch(getTokenSuccessfull(response)));
};
