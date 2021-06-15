import getQuestionsFromAPI from '../services/api';
export const REQUEST_API_GAME = 'REQUEST_API_GAME';
export const GET_QUESTIONS = 'GET_QUESTIONS';

export const requestApiGame = (questionsArray) => ({
  type: REQUEST_API_GAME,
  results: questionsArray,
});

const tokenUser = localStorage.getItem('token');

export const requestQuestionThunk = () => async (dispatch) => {
  const amountOfQuestions = 5;
  const questions = await getQuestionsFromAPI(amountOfQuestions, tokenUser);
  const questionsArray = questions.results;
  dispatch(requestApiGame(questionsArray));
};
