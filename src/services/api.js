const TOKEN_URL = 'https://opentdb.com/api_token.php?command=request';
const QUESTIONS_URL = 'https://opentdb.com/api.php?';
const CATEGORIES_URL = 'https://opentdb.com/api_category.php';
const INITIAL_AMOUNT = 5;

const mountURL = (urlBase, params) => {
  let url = urlBase;
  params.forEach((param) => {
    const key = Object.keys(param);
    const value = Object.values(param);
    if (value) url = url.concat(`&${key}=`, value);
  });
  return url;
};

const getToken = async () => {
  const dataToken = await fetch(TOKEN_URL);
  return dataToken.json();
};

const getQuestions = async (token, amount = INITIAL_AMOUNT,
  category = '', difficulty = '') => {
  const params = [{ category }, { difficulty }, { amount }, { token }];
  const urlQuestions = mountURL(QUESTIONS_URL, params);

  const dataQuestions = await fetch(urlQuestions);
  return dataQuestions.json();
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
