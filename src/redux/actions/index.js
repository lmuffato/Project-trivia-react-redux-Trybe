export const LOGIN = 'LOGIN';

export const receiveToken = (token) => ({ type: LOGIN, token });

export const fetchToken = () => async (dispatch) => {
  const tokenJson = await fetch('https://opentdb.com/api_token.php?command=request');
  const token = await tokenJson.json();
  dispatch(receiveToken(token));
};
