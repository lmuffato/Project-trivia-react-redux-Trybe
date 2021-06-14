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
    return apiJson;
  } catch (error) {
    throw error(error);
  }
};

export const fetchAPI = async (token) => {
  try {
    const fetchApi = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const apiJson = await fetchApi.json();
    return apiJson;
  } catch (error) {
    throw error(error);
  }
};
