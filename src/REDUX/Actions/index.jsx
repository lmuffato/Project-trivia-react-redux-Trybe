export const LOGIN = 'LOGIN';

export function actionLogin(name, email) {
  return ({
    type: LOGIN,
    payload: {
      name, email,
    },
  });
}

export const loadingRequest = () => ({
  type: 'IS_LOADING',
});

export const errorRequest = (error) => ({
  type: 'ERROR_REQUEST',
  error,
});

export const successRequest = (data) => ({
  type: 'SUCCESS_REQUEST',
  data,
});

export const successQuestions = (data) => ({
  type: 'SUCCESS_QUESTIONS',
  data,
});

export const ThunkTrivia = (token) => (dispatch) => (fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
  .then((response) => (response.json()))
  .then((data) => dispatch(successQuestions(data))));

export const ThunkAPI = (name, email) => async (dispatch) => {
  dispatch(loadingRequest());
  dispatch(actionLogin(name, email));

  fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => (response.json()))
    .then((data) => {
      dispatch(ThunkTrivia(data.token));
      dispatch(successRequest(data));
    });
};
