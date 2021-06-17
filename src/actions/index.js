export const LOG_IN = 'LOG_IN';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const REQUEST_TOKEN_SUCCESS = 'REQUEST_TOKEN_SUCCESS';
export const GET_QUESTIONS_SUCCESS = 'GET_QUESTIONS_SUCCESS';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const SAVE_AVATAR = 'SAVE_AVATAR';
export const FILTER = 'FILTER';

export const login = (payload) => ({
  type: LOG_IN,
  payload,
});

const requestToken = () => ({
  type: REQUEST_TOKEN,
});

const requestTokenSuccess = (payload) => ({
  type: REQUEST_TOKEN_SUCCESS,
  payload,
});

const requestQuestionsSuccess = (payload) => ({
  type: GET_QUESTIONS_SUCCESS,
  payload,
});

const requestQuestions = () => ({
  type: GET_QUESTIONS,
});

export const saveAvatar = (payload) => ({
  type: SAVE_AVATAR,
  payload,
});

export const filters = (payload) => ({
  type: FILTER,
  payload,
});

export const fetchToken = () => async (dispatch) => {
  dispatch(requestToken());
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const token = await response.json();
    localStorage.setItem('token', token.token);
    return dispatch(requestTokenSuccess(token.token));
  } catch (error) {
    console.log('Erro na resposta do Token na função fetchToken', error);
  }
};

export const fetchQuestions = (token) => async (dispatch) => {
  dispatch(requestQuestions());
  try {
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    // const urlArray = [`${url}${filter}`];
    // const newUrl = urlArray.join(' ');
    console.log(url);
    const response = await fetch(url);
    const questions = await response.json();
    return dispatch(requestQuestionsSuccess(questions.results));
  } catch (error) {
    console.log('Erro na requisição de perguntas da função fecthQuestions', error);
  }
};
