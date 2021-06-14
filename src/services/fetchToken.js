export default async function fetchToken() {
  const { token } = await (await fetch('https://opentdb.com/api_token.php?command=request')).json();
  return token;
}
