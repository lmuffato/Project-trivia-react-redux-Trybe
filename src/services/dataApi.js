const tokenRequest = 'https://opentdb.com/api_token.php?command=request';

export const getToken = () => fetch(tokenRequest)
  .then((response) => response.json());

export const getQuestions = (token) => fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
  .then((response) => response.json());
