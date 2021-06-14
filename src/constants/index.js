const API_TOKEN = 'https://opentdb.com/api_token.php?command=request';
const API_QUESTIONS = (amount, token) => `https://opentdb.com/api.php?amount=${amount}&token=${token}`;
const API_GRAVATAR = (md5Hash) => `https://www.gravatar.com/avatar/${md5Hash}`;

const LOGIN = 'LOGIN';

export { LOGIN, API_TOKEN, API_QUESTIONS, API_GRAVATAR };
