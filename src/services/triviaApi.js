// Formato de URL necessário:
// https://www.gravatar.com/avatar/${hash-gerada}

// Exemplo de URL com hash de uma pessoa
// https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50

// Exemplo de imagem exibida com a URL
/* <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" /> */

// Paga pegar as perguntas, você deve realizar um GET request para o seguinte endpoint:

// https://opentdb.com/api.php?amount=${quantidade-de-perguntas-retornadas}&token=${seu-token-aqui}

// Recomendação
// https://opentdb.com/api.php?amount=5&token=${seu-token-aqui}

export const getToken = async () => {
  try {
    const fetchApi = await fetch('https://opentdb.com/api_token.php?command=request');
    const apiJson = await fetchApi.json();
    return apiJson.token;
  } catch (error) {
    throw error(error);
  }
};

export async function fetchAPI(token, category, dificulty, type) {
  let cat = `&category=${category}`;
  let df = `&difficulty=${dificulty}`;
  let tp = `&type=${type}`;
  if (category === null) cat = '';
  if (dificulty === null) df = '';
  if (type === null) tp = '';
  const URL = `https://opentdb.com/api.php?amount=5${cat}${df}${tp}&token=${token}`;
  console.log(URL);
  try {
    const fetchApi = await fetch(URL);
    const apiJson = await fetchApi.json();
    return apiJson;
  } catch (error) {
    throw error(error);
  }
}
