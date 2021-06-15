async function requestToken() {
  const request = await fetch('https://opentdb.com/api_token.php?command=request');
  const response = await request.json();
  const { token } = response;
  localStorage.setItem('token', token);
}

export default requestToken;
