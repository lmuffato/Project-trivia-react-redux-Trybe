const TOKEN_URL = 'https://opentdb.com/api_token.php?command=request';
const QUESTIONS_URL = 'https://opentdb.com/api.php';
const CATEGORIES_URL = 'https://opentdb.com/api_category.php';
const INITIAL_QUANTITY_QUESTIONS = 5;

const getToken = async () => {
  const dataToken = await fetch(TOKEN_URL);
  const token = await dataToken.json();
  return token;
};

const getQuestions = async (
  tokenParam,
  categoryParam,
  difficultyParam,
  quantityParam = INITIAL_QUANTITY_QUESTIONS) => {
  const quantity = `amount=${quantityParam}`;
  const token = `token=${tokenParam}`;
  const difficulty = difficultyParam ? `difficulty=${difficultyParam}` : '';
  const category = categoryParam ? `category=${categoryParam}` : '';
  const urlQuestions = `${QUESTIONS_URL}?${quantity}&${difficulty}&${category}&${token}`;

  const dataQuestions = await fetch(urlQuestions);
  const questions = await dataQuestions.json();
  return questions;
};

const getCategories = async () => {
  const dataCategories = await fetch(CATEGORIES_URL);
  const categories = await dataCategories.json();
  return categories.trivia_categories;
};

export {
  getToken,
  getQuestions,
  getCategories,
};
