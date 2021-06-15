const BASE_URL = 'https://opentdb.com/api.php?amount=5';

export default async function fetchToken() {
  const fetchGetToken = await fetch('https://opentdb.com/api_token.php?command=request');
  const jsonToken = await fetchGetToken.json();
  return jsonToken;
}

export async function fetchQuestion(token) {
  try {
    const fetchGetQuestion = await fetch(`${BASE_URL}&token=${token}`);
    const jsonQuestion = await fetchGetQuestion.json();
    return jsonQuestion;
  } catch (error) {
    return console.log(`Token expirado, efetue novo Login - ${error}`);
  }
}
