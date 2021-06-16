const TOKEN_URL = 'https://opentdb.com/api_token.php?command=request';

const getToken = async () => {
  const dataToken = await fetch(TOKEN_URL);
  const token = await dataToken.json();
  return token;
};

export default getToken;
