import tokenFetch from '../service/tokenFetch';
// import questionsFetch from '../service/questionsFetch';

export const REQUEST_API = 'REQUEST_API';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const REQUEST_QUESTION_SUCESS = 'REQUEST_QUESTION_SUCESS';
export const REQUEST_QUESTION_FAIL = 'REQUEST_QUESTION_FAIL';
export const PLAYER = 'PLAYER';

export function requestApi() {
  return {
    type: REQUEST_API,
  };
}

export function requestToken(token) {
  return {
    type: REQUEST_TOKEN,
    payload: token,
  };
}

export function updatePlayer(player) {
  return {
    type: PLAYER,
    payload: player,
  };
}

/* export function questionsSuccess(payload) {
  return {
    type: REQUEST_QUESTION_SUCESS,
    payload,
  };
}
 */
/* export function questionsFail(payload) {
  return {
    type: REQUEST_QUESTION_FAIL,
    payload,
  };
}
export const getQuestion = (token) => async (dispatch) => {
  dispatch(requestApi());
  try {
    const questions = await questionsFetch(token);
    dispatch(questionsSuccess(questions));
  } catch (error) {
    dispatch(questionsFail(error));
  }
}; */

/* export const getToken = () => async (dispatch) => {
  dispatch(requestApi());
  try {
    const token = await tokenFetch();
    console.log(token);
    return dispatch(requestToken(token));
  } catch (error) {
    console.log('ERROR');
    dispatch(questionsFail(error))
  }
}; */

export const getToken = (callback) => (dispatch) => {
  dispatch(requestApi());
  tokenFetch()
    .then((token) => dispatch(requestToken(token)))
    .then(() => {
      callback();
    });
};
