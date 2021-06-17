import tokenFetch from '../service/tokenFetch';
import questionsFetch from '../service/questionsFetch';

export const REQUEST_API = 'REQUEST_API';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const REQUEST_QUESTION_SUCESS = 'REQUEST_QUESTION_SUCESS';
export const REQUEST_QUESTION_FAIL = 'REQUEST_QUESTION_FAIL';
export const GET_PLAYER = 'GET_PLAYER';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const DISABLE_ANS = 'DISABLE_ANS';
export const UPDATE_TIME = 'UPDATE_TIME';
export const VERIFY_ANSWERED = 'VERIFY_ANSWERED';

export function requestApi() {
  return {
    type: REQUEST_API,
  };
}

export function requestToken(payload) {
  return {
    type: REQUEST_TOKEN,
    payload,
  };
}

export function questionsSuccess(payload) {
  return {
    type: REQUEST_QUESTION_SUCESS,
    payload,
  };
}

export function questionsFail(payload) {
  return {
    type: REQUEST_QUESTION_FAIL,
    payload,
  };
}
// export const getQuestion = (token) => async (dispatch) => {
//   dispatch(requestApi());
//   try {
//     const questions = await questionsFetch(token);
//     dispatch(questionsSuccess(questions));
//   } catch (error) {
//     dispatch(questionsFail(error));
//   }
// };

export const getQuestion = (token) => async (dispatch) => {
  dispatch(requestApi());
  questionsFetch(token).then((questions) => dispatch(questionsSuccess(questions)));
};
export const getToken = (callback) => (dispatch) => {
  dispatch(requestApi());
  tokenFetch()
    .then((token) => dispatch(requestToken(token)))
    .then(() => {
      callback();
    });
};

export function updateScore(score) {
  return {
    type: UPDATE_SCORE,
    payload: score,
  };
}

export const updateStorageThunk = (score, callback) => async (dispatch) => {
  await dispatch(updateScore(score));
  callback();
};

export function verifyAnswered(isAnswered) {
  return {
    type: VERIFY_ANSWERED,
    payload: isAnswered,
  };
}

// export function getName(namePlayer) {
//   return {
//     type: GET_NAME,
//     payload: namePlayer,
//   };
// }

export function getPlayer(player) {
  return {
    type: GET_PLAYER,
    payload: player,
  };
}

export function disableAnswer(payload) {
  return {
    type: DISABLE_ANS,
    payload,
  };
}

export function updateTime(time) {
  return { type: UPDATE_TIME, payload: time };
}
