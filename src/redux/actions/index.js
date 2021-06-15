import md5 from 'crypto-js/md5';
import { LOGIN, GET_TOKEN } from './actionsTypes';

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

const doingRequest = () => ({ type: REQUESTING });

const receiveData = (data, type) => ({
  type,
  payload: data,
});

export function fetchGravatar(email) {
  const hash = md5(email).toString();
  const newURL = `https://br.gravatar.com/site/implement/${hash}/`;
  return (dispatch) => {
    dispatch(doingRequest());
    return fetch(newURL)
      .then((response) => response.json())
      .then((data) => dispatch(receiveData(data, ADD_GRAVATAR)));
  };
}
