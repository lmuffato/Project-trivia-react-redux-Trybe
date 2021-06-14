const tokenRequest = 'https://opentdb.com/api_token.php?command=request';

const getToken = () => fetch(tokenRequest)
  .then((response) => response.json())
  .then((json) => json);

export default getToken;
/* https://opentdb.com/api.php?amount=5&token=${seu-token-aquii} */
