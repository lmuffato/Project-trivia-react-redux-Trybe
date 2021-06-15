import { LOGIN, GET_QUESTIONS, GET_TOKEN, REQUEST_API } from './actionsTypes';

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
  return {
    type: GET_TOKEN,
    payload: saveToken,
  };
};

const fetchApiToken = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const date = await response.json();
  return date;
};

export const getToken = () => (dispatch) => {
  dispatch(requestAPI());
  fetchApiToken()
    .then((res) => {
      dispatch(addToken(res.token));
    });
};

const endpointBase = 'https://opentdb.com/api.php?amount=5&token=';
export function fetchQuestion() {
  console.log('função de requisição de questões acionada');
  const token = localStorage.getItem('token');
  return (dispatch) => {
    dispatch(requestAPI);
    return fetch(`${endpointBase}${token}`)
      .then((response) => response.json())
      .then((response) => {
        const codeError = 3;
        const codeSucess = 0;
        if (response.response_code === codeError) {
          getToken();
          fetchQuestion();
          console.log('erro na requisição das questões');
        } else if (response.response_code === codeSucess) {
          dispatch(getQuestion(response));
          console.log('dispatch das questões realizado');
        }
      });
  };
}
