const API_URL = 'https://opentdb.com/api.php?';

const getQuestionsFromAPI = async (amount, token) => {
  const response = await fetch(`${API_URL}amount=${amount}&token=${token}`);
  return response.json();
};

export default getQuestionsFromAPI;
