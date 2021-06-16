import { LOGIN, GET_QUESTIONS, GET_TOKEN,
  REQUEST_API, ADD_GRAVATAR } from './actionsTypes';

export const addLogin = (userInfo) => ({
  type: LOGIN,
  payload: { ...userInfo },
});

export const requestAPI = () => ({ type: REQUEST_API });

export const getQuestion = (returnOfAPI) => ({
  type: GET_QUESTIONS,
  payload: returnOfAPI.results,
});

export const addToken = (saveToken) => {
  localStorage.setItem('token', saveToken);
  console.log(saveToken, 'novo token');
  return {
    type: GET_TOKEN,
    payload: saveToken,
  };
};

function updateToken() {
  return async (dispatch) => {
    dispatch(requestAPI());
    return fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((response) => {
        addToken(response.token);
        return response.token;
      });
  };
}

const endpointBase = 'https://opentdb.com/api.php?amount=5&token=';
export function fetchQuestion(token) {
  return async (dispatch) => {
    dispatch(requestAPI());
    return fetch(`${endpointBase}${token}`)
      .then((response) => response.json())
      .then((response) => {
        const codeError = 3;
        const codeSucess = 0;
        console.log(response, 'resposta da api');
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
        addToken(response.token);
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
