const endpoint = 'https://opentdb.com/api_token.php?command=request';

const fetchAPI = async () => {
  try {
    const fetchToken = await fetch(endpoint);
    const responseToken = await fetchToken.json();
    return responseToken;
  } catch (error) { throw error('Token não encontrado!'); }
};

export default fetchAPI;
