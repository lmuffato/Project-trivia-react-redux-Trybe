export default async function getApiToken() {
  const verifiedToken = JSON.parse(localStorage.getItem('token')) || [];
  if (verifiedToken.token) {
    fetch(`https://opentdb.com/api_token.php?command=reset&token=${verifiedToken.token}`);
  } if (!verifiedToken.token) {
    const resolve = await fetch('https://opentdb.com/api_token.php?command=request');
    const token = await resolve.json();
    localStorage.setItem('token', JSON.stringify(token));
  }
}
