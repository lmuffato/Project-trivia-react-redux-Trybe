import tokenFetch from '../service/tokenFetch';
import questionsFetch from '../service/questionsFetch';
import fetchCategories from '../service/categoriesFetch';

export const REQUEST_API = 'REQUEST_API';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const REQUEST_QUESTION_SUCESS = 'REQUEST_QUESTION_SUCESS';
export const REQUEST_QUESTION_FAIL = 'REQUEST_QUESTION_FAIL';
export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES';
export const GET_PLAYER = 'GET_PLAYER';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const UPDATE_ASSERTIONS = 'UPDATE_ASSERTIONS';
export const DISABLE_ANS = 'DISABLE_ANS';
export const UPDATE_TIME = 'UPDATE_TIME';
export const MARK_ANSWERED = 'MARK_ANSWERED';
export const CLEAR_PLAYER_STATE = 'CLEAR_PLAYER_STATE';

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

const dispatchCategories = (payload) => ({
  type: REQUEST_CATEGORIES,
  payload,
});

export const getCategories = () => async (dispatch) => {
  const categories = await fetchCategories();
  dispatch(dispatchCategories(categories.trivia_categories));
};

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

function updateScore(score) {
  return {
    type: UPDATE_SCORE,
    payload: score,
  };
}

function updateAssertions(assertions) {
  return {
    type: UPDATE_ASSERTIONS,
    payload: assertions,
  };
}

export const updateStorageThunk = (scoreAssertions, callback) => async (dispatch) => {
  const { score, sumAssertions } = scoreAssertions;
  await dispatch(updateScore(score));
  await dispatch(updateAssertions(sumAssertions));
  callback();
};

export function markAnswered(isAnswered) {
  return {
    type: MARK_ANSWERED,
    payload: isAnswered,
  };
}

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

export function clearPlayerState(payload) {
  return { type: CLEAR_PLAYER_STATE, payload };
}
