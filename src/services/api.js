const API_URL = 'https://opentdb.com/api.php?';

export const getQuestionsFromAPI = async (amount, token) => {
  const response = await fetch(`${API_URL}amount=${amount}&token=${token}`);
  return response.json();
};

export const getTokenFromAPIAndSaveToLS = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const { token } = await response.json();
  localStorage.setItem('token', token);
};
