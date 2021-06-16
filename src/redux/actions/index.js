export const LOGIN = 'LOGIN';
export const RECEIVE_QUESTS = 'RECEIVE_QUESTS';
export const USER_DATA = 'USER_DATA';
export const CHANGE_CONFIGS = 'CHANGE_CONFIGS';

export const receiveToken = (token) => ({ type: LOGIN, token });

export const loginAction = (name, email) => ({ type: USER_DATA, name, email });

export const receiveQuestions = (questions) => ({ type: RECEIVE_QUESTS, questions });

export const changeConfigs = (configs) => ({ type: CHANGE_CONFIGS, configs });

export const fetchToken = (amount) => async (dispatch) => {
  const tokenJson = await fetch('https://opentdb.com/api_token.php?command=request');
  const token = await tokenJson.json();
  dispatch(receiveToken(token));
  console.log(amount);
  const questionsJson = await fetch(`https://opentdb.com/api.php?amount=${amount}&token=${token.token}`);
  const questions = await questionsJson.json();
  dispatch(receiveQuestions(questions));
};

export const buttonLoginAction = (name, email, amount) => async (dispatch) => {
  dispatch(loginAction(name, email));
  console.log(amount);
  dispatch(fetchToken(amount));
};
