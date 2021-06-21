import ApiGetQuestions from '../../services/ApiGetQuestions';
import requestToken from '../../services/requestToken';

export const LOGIN = 'LOGIN';

export const loginAction = (payload) => ({ type: LOGIN, payload });

export const UPDATE_SCORE = 'UPDATE_SCORE';
export const updateScoreAction = (payload) => ({ type: UPDATE_SCORE, payload });

// export const SET_IMG = 'SET_IMG';
// export const setImg = (payload) => ({ type: SET_IMG, payload });

// questions
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const getQuestions = () => ({ type: GET_QUESTIONS });

export const GET_QUESTIONS_SUCCESS = 'GET_QUESTIONS_SUCCESS';
export const getQuestionsSuccess = (payload) => (
  { type: GET_QUESTIONS_SUCCESS, payload });

export const GET_QUESTIONS_ERROR = 'GET_QUESTIONS_ERROR';
export const getQuestionsError = (payload) => (
  { type: GET_QUESTIONS_ERROR, payload }
);

// Token

export const GET_TOKEN = 'GET_TOKEN';
export const getToken = () => (
  { type: GET_TOKEN }
);

export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const getTokenSuccess = (payload, localStorage) => (
  { type: GET_TOKEN_SUCCESS, payload, localStorage }
);

export const GET_TOKEN_ERROR = 'GET_TOKEN_ERROR';
export const getTokenError = (payload) => (
  { type: GET_TOKEN_ERROR, payload }
);

// Thunks functions

export const getTokenThunk = () => (dispatch) => {
  dispatch(getToken());
  requestToken()
    .then((data) => dispatch(getTokenSuccess(data, 'token')))
    .catch((error) => dispatch(getTokenError(error)));
};

export const getQuestionsThunk = (token) => (dispatch) => {
  dispatch(getQuestions());
  ApiGetQuestions(token)
    .then((data) => dispatch(getQuestionsSuccess(data)))
    .catch((error) => dispatch(getQuestionsError(error.message)));
};

export const SAVE_TIMER = 'SAVE_TIMER';
export const saveTimerAction = (payload) => ({ type: SAVE_TIMER, payload });

export const CALC_POINTS = 'CALC_POINTS';
export const calcPointsAction = () => ({ type: CALC_POINTS });

export const SET_DIFFICULTY = 'SET_DIFFICULTY';
export const setDifficultyAction = (payload) => ({ type: SET_DIFFICULTY, payload });
// middleware localStorage
export const localStorage = () => (next) => (action) => {
  if (action.localStorage !== undefined) {
    window.localStorage.setItem(
      action.localStorage,
      JSON.stringify(action.payload),
    );
  }
  return next(action);
};
