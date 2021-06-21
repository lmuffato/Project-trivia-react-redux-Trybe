import { LOGIN, GET_QUESTIONS, GET_TOKEN,
  REQUEST_API,
  ADD_GRAVATAR, UPDATE_SCORE, UPDATE_RANKING, UPDATE_CATEGORY } from './actionsTypes';

export const updateScore = (newScore) => {
  const { assertions, score } = newScore;
  const previousPlayerInfo = JSON.parse(localStorage.getItem('state'));
  const stateUpdate = { player: { ...previousPlayerInfo.player, assertions, score } };
  localStorage.setItem('state', JSON.stringify(stateUpdate));
  return ({
    type: UPDATE_SCORE,
    payload: { ...newScore },
  });
};

export const addLogin = (userInfo) => {
  const player = { ...userInfo, score: 0, assertations: 0 };
  localStorage.setItem('state', JSON.stringify({ player }));
  return ({
    type: LOGIN,
    payload: { ...userInfo },
  });
};

export const requestAPI = () => ({ type: REQUEST_API });

export const getQuestion = (returnOfAPI) => ({
  type: GET_QUESTIONS,
  payload: returnOfAPI.results,
});

export const addToken = (saveToken) => {
  localStorage.setItem('token', saveToken);
  return {
    type: GET_TOKEN,
    payload: saveToken,
  };
};

export const addRank = (infos) => ({
  type: UPDATE_RANKING,
  payload: infos,
});

export const addOptionsConfig = (obj) => ({
  type: UPDATE_CATEGORY,
  payload: obj,
});

function updateToken() {
  return async (dispatch) => {
    dispatch(requestAPI());
    return fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((response) => {
        dispatch(addToken(response.token));
        return response.token;
      });
  };
}

const endpointBase = 'https://opentdb.com/api.php?amount=5&token=';
export function fetchQuestion(token, categoryId, difficult, type) {
  const typeE = `&type=${type}`;
  const url = `${endpointBase}${token}`
  + `&category=${categoryId}&difficulty=${difficult}${typeE}`;
  const one = 1;
  const two = 2;
  const three = 3;
  const four = 4;
  return (dispatch) => {
    dispatch(requestAPI());
    return fetch(url)
      .then((response) => response.json())
      .then((response) => {
        if (response.response_code === 0) console.warn('Success');
        if (response.response_code === one) console.warn('No Results');
        if (response.response_code === two) console.warn('Invalid Parameter ');
        if (response.response_code === three) console.warn('Token Not Found ');
        if (response.response_code === four) console.warn('Token Empty');
        const codeError = 3;
        const codeSucess = 0;
        if (response.response_code === codeError) {
          fetchQuestion(updateToken());
        } else if (response.response_code === codeSucess) {
          dispatch(getQuestion(response));
        }
      });
  };
}

export function fetchToken() {
  return async (dispatch) => {
    dispatch(requestAPI());
    return fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((response) => {
        dispatch(addToken(response.token));
        return response.token;
      })
      .then((token) => fetchQuestion(token));
  };
}
// Actions Relacionadas ao gravatar
export const addGravatar = (url) => ({
  type: ADD_GRAVATAR,
  payload: url,
});
