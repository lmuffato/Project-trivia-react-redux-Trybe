export const getAPIToken = async () => {
  const result = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await result.json();

  return data;
};

export const getAPIQuestions = async (token) => {
  const result = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const data = await result.json();

  return data;
};
