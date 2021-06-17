async function requestToken() {
  const request = await fetch('https://opentdb.com/api_token.php?command=request');
  const response = await request.json();
  const data = response;
  if (data.response_code !== 0) {
    throw Error(data.response_message);
  }
  return data.token;
}

export default requestToken;
