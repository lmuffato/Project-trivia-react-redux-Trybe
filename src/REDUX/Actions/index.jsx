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
  type: 'LOADING_REQUEST',
});

export const errorRequest = (error) => ({
  type: 'ERROR_REQUEST',
  error,
});

export const successRequest = (data) => ({
  type: 'SUCCESS_REQUEST',
  data,
});

export const ThunkAPI = () => (dispatch) => {
  dispatch(loadingRequest());

  return fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => (response.json()))
    .then((data) => dispatch(successRequest(data)));
};
