export async function fetchToken() {
  const tokenApi = 'https://opentdb.com/api_token.php?command=request';
  try {
    const response = await fetch(tokenApi);
    const token = await response.json();
    return token;
  } catch (error) {
    console.log(error);
  }
}

// export function fetchToken() {
//   const tokenApi = 'https://opentdb.com/api_token.php?command=request';
//   fetch(tokenApi)
//     .then((response) => response.json());
//   // .then(({ token }) => token);
//   return response;
//   // console.log(data);
// }
// {
//   "response_code":0,
//   "response_message":"Token Generated Successfully!",
//   "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
// }

export async function fetchQuest(seuTokenAqui) {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${seuTokenAqui}`);
  const data = await response.json();
  // console.log(data);
  return data;
}

export async function fetchOutraQuest(seuTokenAqui, quantidadeDePerguntasRetornadas) {
  const response = await fetch(`https://opentdb.com/api.php?amount=${quantidadeDePerguntasRetornadas}&token=${seuTokenAqui}`);
  const data = await response.json();
  // console.log(data);
  return data;
}

// localStorage.setItem('', JSON.stringify());
// localStorage.getItem('');
