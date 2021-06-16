export async function getApiToken() {
  const verifiedToken = JSON.parse(localStorage.getItem('token')) || [];
  if (verifiedToken.token) {
    fetch(`https://opentdb.com/api_token.php?command=reset&token=${verifiedToken.token}`);
  } if (!verifiedToken.token) {
    const resolve = await fetch('https://opentdb.com/api_token.php?command=request');
    const token = await resolve.json();
    localStorage.setItem('token', JSON.stringify(token));
  }
}

// Exercicio 2:

export async function getApiQuestions() {
  const codeError = 3;
  const token = JSON.parse(localStorage.getItem('token')) || [];
  const resolve = await fetch(`https://opentdb.com/api.php?amount=5&token=${token.token}`);
  const result = await resolve.json();
  if (result.response_code === codeError) {
    const validadeCode = await fetch(`https://opentdb.com/api.php?amount=5&token=${token.token}`);
    const questions = await validadeCode.json();
    return questions;
  }
  return result;
}
