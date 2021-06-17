import fetchToken from '../../services/fetchToken';
import fetchQuestion from '../../services/fetchQuestions';

export const LOGIN = 'LOGIN';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const GET_TOKEN = 'GET_TOKEN';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const GET_QUESTIONS_SUCCESS = 'GET_QUESTIONS_SUCCESS';
export const GET_SCORE = 'GET_SCORE';
export const GET_ASSERTIONS = 'GET_ASSERTIONS';

export const login = (name, gravatarEmail) => ({
  type: LOGIN,
  payload: {
    name,
    gravatarEmail,
  },
});

export const getAssertions = (assertions) => ({
  type: GET_ASSERTIONS,
  payload: {
    assertions,
  },
});

export const getScore = (score) => ({
  type: GET_SCORE,
  payload: {
    score,
  },
});

export const getQuestions = () => ({
  type: GET_QUESTIONS,
});

export const getQuestionsSuccess = (questions) => ({
  type: GET_QUESTIONS_SUCCESS,
  payload: {
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

export const getQuestionThunk = (token) => (dispatch) => {
  dispatch(getQuestions());
  fetchQuestion(token)
    .then((response) => dispatch(getQuestionsSuccess(response)));
};
