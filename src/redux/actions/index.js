import md5 from 'crypto-js/md5';
import { getAPIToken, getAPIQuestions } from '../../services/getAPI';

export const GET_TOKEN = 'GET_TOKEN';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const FETCH_GRAVATAR = 'FETCH_GRAVATAR';
export const GET_PLACAR = 'GET_PLACAR';
export const GET_QUESTION = 'GET_QUESTIONS';
export const GET_QUESTION_SUCCESS = 'GET_QUESTION_SUCCESS';
export const SAVE_USER = 'SAVE_USER';
export const RESET_PLACAR = 'RESET_PLACAR';

export const getPlacar = (payload) => ({
  type: GET_PLACAR,
  payload,
});

export const resetPlacar = (payload) => ({
  type: RESET_PLACAR,
  payload,
});

export const getGravatar = (payload) => ({
  type: FETCH_GRAVATAR,
  payload,
});

export const getToken = () => ({
  type: GET_TOKEN,
});

export const getTokenSuccess = (payload) => ({
  type: GET_TOKEN_SUCCESS,
  payload,
});

export const getQuestion = () => ({
  type: GET_QUESTION,
});

export const getQuestionSuccess = (payload) => ({
  type: GET_QUESTION_SUCCESS,
  payload,
});

export const getTokenThunk = (value) => (dispatch) => {
  dispatch(getToken());
  getAPIToken()
    .then((result) => {
      const hash = md5(value.email);
      const hashConvert = hash.toString();
      const gravatarImg = `https://www.gravatar.com/avatar/${hashConvert}`;
      const { token } = result;
      localStorage.setItem('token', token);
      dispatch(getTokenSuccess({ ...value, token }));
      dispatch(getGravatar({ gravatarImg }));
    });
};

export const getQuestionsThunk = (token) => (dispatch) => {
  dispatch(getQuestion());
  getAPIQuestions(token)
    .then(({ results }) => dispatch(getQuestionSuccess(results)));
};

export const saveUser = (payload) => ({
  type: SAVE_USER,
  payload,
});
