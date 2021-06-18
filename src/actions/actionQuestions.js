export const GET_QUESTIONS = 'GET_QUESTIONS';
export const GET_QUESTIONS_SUCCESS = 'GET_QUESTIONS_SUCCESS';
export const GET_QUESTIONS_ERROR = 'GET_QUESTIONS_ERROR';

export const getQuestions = () => ({
  type: GET_QUESTIONS,
});

export const getQuestionsSuccess = (questions) => ({
  type: GET_QUESTIONS_SUCCESS,
  payload: {
    questions,
  },
});

export const getQuestionsError = (error) => ({
  type: GET_QUESTIONS_ERROR,
  payload: {
    questions: error,
  },
});

export const getQuestionsThunk = (token) => async (dispatch) => {
  dispatch(getQuestions());
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    dispatch(getQuestionsSuccess(data));
  } catch (error) {
    dispatch(getQuestionsError(error));
  }
};
