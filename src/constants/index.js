const API_TRIVIA_TOKEN = 'https://opentdb.com/api_token.php?command=request';
const API_TRIVIA_QUESTIONS = (amount, token) => `https://opentdb.com/api.php?amount=${amount}&token=${token}`;
const API_GRAVATAR = (md5Hash) => `https://www.gravatar.com/avatar/${md5Hash}`;

const LOGIN = 'LOGIN';
const GET_GRAVATAR = 'GET_GRAVATAR';
const GET_QUESTIONS = 'GET_QUESTIONS';
const QUESTIONS_AMOUNT = '5';

export { API_TRIVIA_TOKEN, API_TRIVIA_QUESTIONS, API_GRAVATAR,
  LOGIN, GET_GRAVATAR, GET_QUESTIONS, QUESTIONS_AMOUNT };
