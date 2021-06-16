export const USER_LOGIN = 'USER_LOGIN';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const IS_FETCHING = 'IS_FETCHING';

export const loginUserAction = (payload) => ({
  type: USER_LOGIN,
  payload,
});

export const getQuestionsAction = (payload) => ({
  type: GET_QUESTIONS,
  payload,
});

export const isFetchingAction = () => ({
  type: IS_FETCHING,
});

// const fetchFiveQuestions = async () => {
//   const amountQuestions = 5;
//   const token = getLocalStorage('token');
//   this.fetchQuestions(amountQuestions, token);
// };

export const getQuestionsActionThunk = (amountQuestion, token) => async (dispatch) => {
  try {
    dispatch(isFetchingAction());
    const response = await fetch(`https://opentdb.com/api.php?amount=${amountQuestion}&token=${token}`);
    const json = await response.json();
    console.log(json);
    if (json.response_code === 0) {
      dispatch(getQuestionsAction(json.results));
    } else {
      throw new Error('Token inválido, tentando atualizar o token, aguarde.');
    }
  } catch (error) {
    console.error(error);
  }
};
