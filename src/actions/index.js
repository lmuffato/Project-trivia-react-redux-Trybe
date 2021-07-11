import {
  USER_INFOS,
  GET_TOKEN,
} from './actionTypes';

export const userInfo = (payload) => ({
  type: USER_INFOS,
  payload,
});

export const getToken = (payload) => ({
  type: GET_TOKEN,
  payload,
});

export function fetchToken() {
  return async (dispatch) => fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((response) => {
      getToken(response.token);
      return response.token;
    });
}
