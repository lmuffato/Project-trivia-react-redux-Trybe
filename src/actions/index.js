export const LOG_IN = 'LOG_IN';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const GET_QUESTIONS = 'GET_QUESTIONS';

export const login = (payload) => ({
  type: LOG_IN,
  payload,
});

const requestToken = (payload) => ({
  type: REQUEST_TOKEN,
  payload,
});

const requestQuestions = (payload) => ({
  type: GET_QUESTIONS,
  payload,
});

export const fetchToken = () => async (dispatch) => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const token = await response.json();
    localStorage.setItem('token', token.token);
    return dispatch(requestToken(token.token));
  } catch (error) {
    console.log('Erro na resposta do Token na função fetchToken', error);
  }
};

export const fetchQuestions = (token) => async (dispatch) => {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const questions = await response.json();
    return dispatch(requestQuestions(questions.results));
  } catch (error) {
    console.log('Erro na requisição de perguntas da função fecthQuestions', error);
  }
};
