const getAPIToken = async () => {
  const result = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await result.json();

  return data;
};

export default getAPIToken;
