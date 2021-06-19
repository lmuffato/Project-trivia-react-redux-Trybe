import { getQuestionsFromAPI } from '../services/api';

export const REQUEST_API_GAME = 'REQUEST_API_GAME';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const SET_TIMER_ID = 'SET_TIMER_ID';
export const SAVE_SECONDS = 'SAVE_SECONDS';
export const SAVE_NUMBER_OF_CORRECT_ANSWER = 'SAVE_NUMBER_OF_CORRECT_ANSWER';

// ACTIONS
export const requestApiGame = (questionsArray) => ({
  type: REQUEST_API_GAME,
  results: questionsArray,
});

export const setTimerID = (timerID) => ({
  type: SET_TIMER_ID,
  timerID,
});

export const saveSeconds = (seconds) => ({
  type: SAVE_SECONDS,
  seconds,
});

export const saveNOfCorrectAnswer = (nOfCorrectAnswers) => ({
  type: SAVE_NUMBER_OF_CORRECT_ANSWER,
  nOfCorrectAnswers,
});

// THUNKS
export const requestQuestionThunk = () => async (dispatch) => {
  const tokenUser = localStorage.getItem('token');
  const amountOfQuestions = 5;
  const questions = await getQuestionsFromAPI(amountOfQuestions, tokenUser);
  const questionsArray = questions.results;
  const randomNumber = 0.5;
  const questionsArrayShuffled = questionsArray.map((question) => ({
    ...question,
    shuffledAlternatives: [
      ...question.incorrect_answers,
      question.correct_answer].sort(() => Math.random() - randomNumber),
  }));
  dispatch(requestApiGame(questionsArrayShuffled));
};
