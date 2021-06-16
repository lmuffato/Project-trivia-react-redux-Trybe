import ApiGetQuestions from '../../services/ApiGetQuestions';

export const LOGIN = 'LOGIN';

export const loginAction = (payload) => ({ type: LOGIN, payload });

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const getQuestions = () => ({ type: GET_QUESTIONS });

export const GET_QUESTIONS_SUCCESS = 'GET_QUESTIONS_SUCCESS';
export const getQuestionsSuccess = (payload) => (
  { type: GET_QUESTIONS_SUCCESS, payload });

export const GET_QUESTIONS_ERROR = 'GET_QUESTIONS_ERROR';
export const getQuestionsError = (payload) => (
  { type: GET_QUESTIONS_ERROR, payload }
);

export const getQuestionsThunk = (token) => (dispatch) => {
  dispatch(getQuestions());
  ApiGetQuestions(token)
    .then((data) => dispatch(getQuestionsSuccess(data)))
    .catch((error) => dispatch(getQuestionsError(error.message)));
};

// export const getTokenThunk = () => (dispatch) => {
//   dispatch(getToken());
//   requestToken()
//     .then((data) => dispatch(getTokenSuccess(data)))
//     .then((data) => dispatch(getTokenError(data)));
// };
