export const apiTrivia = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const json = await response.json();
  const { token } = json;
  return token;
};

export default apiTrivia;
