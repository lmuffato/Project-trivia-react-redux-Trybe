const retrieveData = async () => {
  const api = await fetch('https://opentdb.com/api_token.php?command=request');
  const response = await fetch(api);
  const datareceived = await response.json();
  localStorage.setItem('token', datareceived.token);
  return this.redirect();
};

export default retrieveData;
