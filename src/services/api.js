export default async function fetchToken() {
  const fetchGetToken = await fetch('https://opentdb.com/api_token.php?command=request');
  const jsonToken = await fetchGetToken.json();
  return jsonToken;
}
