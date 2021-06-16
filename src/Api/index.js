// Requisito 2 - Requisição a Api para pegar o Token
const urlToken = 'https://opentdb.com/api_token.php?command=request';
const requestToken = async () => {
  const response = await fetch(urlToken);
  const dataToken = await response.json();
  return dataToken;
};

export default requestToken;
