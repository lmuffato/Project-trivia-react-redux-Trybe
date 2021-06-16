const URL = 'https://opentdb.com/api_token.php?command=request';

export const tokenAPI = async () => {
  try {
    const response = await fetch(URL);
    const token = await response.json();
    return token.token;
  } catch (error) {
    console.log(error);
  }
};

export const triviaAPI = async (token) => {
  const TRIVIA_URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  try {
    const response = await fetch(TRIVIA_URL);
    const questions = await response.json();
    return questions;
  } catch (error) {
    console.log(error);
  }
};
