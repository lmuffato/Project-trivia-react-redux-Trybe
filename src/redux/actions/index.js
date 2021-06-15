export const LOGIN = 'LOGIN';
export const RECEIVE_QUESTS = 'RECEIVE_QUESTS';

export const receiveToken = (token) => ({ type: LOGIN, token });

export const receiveQuestions = (questions) => ({ type: RECEIVE_QUESTS, questions });

export const fetchToken = () => async (dispatch) => {
  const tokenJson = await fetch('https://opentdb.com/api_token.php?command=request');
  const token = await tokenJson.json();
  dispatch(receiveToken(token));
  const questionsJson = await fetch(`https://opentdb.com/api.php?amount=5&token=${token.token}`);
  const questions = await questionsJson.json();
  dispatch(receiveQuestions(questions));
};
