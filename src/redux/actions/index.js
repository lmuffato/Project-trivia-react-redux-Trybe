export const LOGIN = 'LOGIN';
export const USER_DATA = 'USER_DATA';

export const receiveToken = (token) => ({ type: LOGIN, token });

export const loginAction = (name, email) => ({ type: USER_DATA, name, email });

export const fetchToken = () => async (dispatch) => {
  const tokenJson = await fetch('https://opentdb.com/api_token.php?command=request');
  const token = await tokenJson.json();
  dispatch(receiveToken(token));
};

export const buttonLoginAction = (name, email) => async (dispatch) => {
  dispatch(loginAction(name, email));
  dispatch(fetchToken());
};
