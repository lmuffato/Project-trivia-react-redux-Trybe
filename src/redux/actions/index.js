import { LOGIN, GET_QUESTIONS, GET_TOKEN, REQUEST_API } from './actionsTypes';

export const addLogin = (userInfo) => ({
  type: LOGIN,
  payload: { ...userInfo },
});

export const requestAPI = () => ({ type: REQUEST_API });

export const addToken = () => ({
  type: GET_TOKEN,
});

export const getQuestion = (returnOfAPI) => ({
  type: GET_QUESTIONS,
  payload: returnOfAPI.results,
});

export const getToken = (token) => ({
  type: GET_TOKEN,
  payload: token,
});

export function fetchToken() {
  return (dispatch) => {
    dispatch(requestAPI);
    return fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((response) => {
        dispatch(getToken(response.token));
        return response.token;
      });
  };
}

const endpointBase = 'https://opentdb.com/api.php?amount=5&token=';
export async function fetchQuestion(token) {
  return (dispatch) => {
    dispatch(requestAPI);
    return fetch(`${endpointBase}${token}`)
      .then((response) => response.json())
      .then((response) => {
        const codeError = 3;
        const codeSucess = 0;
        if (response.response_code === codeError) {
          //faz solicitação de novo token
        }

        dispatch(getQuestion(response));
      });

  }
}

/*export function fetchCurrencies() {
  return (dispatch) => {
    dispatch(requestAPI());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((response) => dispatch(updateCurrencies(response)));
  };
} */
