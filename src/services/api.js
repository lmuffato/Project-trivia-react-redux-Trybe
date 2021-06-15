export async function getApiToken() {
  const resolve = await fetch('https://opentdb.com/api_token.php?command=request');
  const token = await resolve.json();
  localStorage.setItem('token', JSON.stringify(token));
}

export async function getApiQuestions() {
  const token = JSON.parse(localStorage.getItem('token')) || [];
  const resolve = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  return resolve.json();
}
