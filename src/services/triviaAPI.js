export const getToken = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  const { token } = data;
  return token;
};

export const getQuestions = async () => {
  const token = await getToken();
  localStorage.setItem('token', token);
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const data = await response.json();
  return data.results;
};
