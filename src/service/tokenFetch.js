const tokenFetch = async () => {
  const { token } = await (await fetch('https://opentdb.com/api_token.php?command=request').json());
  return token;
};

export default tokenFetch;
