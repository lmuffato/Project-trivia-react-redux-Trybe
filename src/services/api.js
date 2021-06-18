const TOKEN_URL = 'https://opentdb.com/api_token.php?command=request';
const QUESTIONS_URL = 'https://opentdb.com/api.php';
const INITIAL_QUANTITY_QUESTIONS = 5;

const getToken = async () => {
  const dataToken = await fetch(TOKEN_URL);
  const token = await dataToken.json();
  return token;
};

const getQuestions = async (token, quantity = INITIAL_QUANTITY_QUESTIONS) => {
  const urlQuestions = `${QUESTIONS_URL}?amount=${quantity}&token=${token}`;
  const dataQuestions = await fetch(urlQuestions);
  const questions = await dataQuestions.json();
  return questions;
};

export {
  getToken,
  getQuestions,
};
