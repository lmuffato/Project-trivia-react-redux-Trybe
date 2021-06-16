// Requisito 2 - Requisição a Api para pegar o Token
const urlToken = 'https://opentdb.com/api_token.php?command=request';
export const requestToken = async () => {
  const response = await fetch(urlToken);
  const dataToken = await response.json();
  return dataToken;
};

// Requisito 5 - Requisição da Api para a Trivia
export const requestTrivia = async (quant, token) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=${quant}&token=${token}`);
  const dataTrivia = await response.json();
  return dataTrivia;
};
