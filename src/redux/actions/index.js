import { LOGIN, GET_TOKEN, ADD_GRAVATAR } from './actionsTypes';

export const addLogin = (userInfo) => ({
  type: LOGIN,
  payload: { ...userInfo },
});

export const addToken = (saveToken) => {
  localStorage.setItem('token', saveToken);
  return {
    type: GET_TOKEN,
    payload: saveToken,
  };
};

const fetchApi = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const date = await response.json();
  return date;
};

export const getToken = () => (dispatch) => {
  fetchApi()
    .then((res) => {
      dispatch(addToken(res.token));
    });
};

// Actions Relacionadas ao gravatar
export const addGravatar = (url) => ({
  type: ADD_GRAVATAR,
  payload: url,
});
