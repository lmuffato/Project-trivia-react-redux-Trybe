export const LOGIN = 'LOGIN';
export const USER_NAME = 'USER_NAME';

export const receiveToken = (token) => ({ type: LOGIN, token });

export const nameAction = (name) => ({ type: USER_NAME, name });

export const fetchToken = () => async (dispatch) => {
  const tokenJson = await fetch('https://opentdb.com/api_token.php?command=request');
  const token = await tokenJson.json();
  dispatch(receiveToken(token));
};

export const buttonLoginAction = (name) => async (dispatch) => {
  dispatch(nameAction(name));
  dispatch(fetchToken());
};
