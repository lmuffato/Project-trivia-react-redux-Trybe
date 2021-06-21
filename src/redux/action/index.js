export const USER_LOGIN = 'USER_LOGIN';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const IS_FETCHING = 'IS_FETCHING';
export const UPDATE_TIMER = 'UPDATE_TIMER';
export const TIMER_RESET = 'TIMER_RESET';
export const ID_INTERVAL = 'ID_INTERVAL';
export const QUESTION_LENGTH = 'QUESTION_LENGTH';
export const SETTINGS = 'SETTINGS';
export const FETCH_QUESTION = 'FETCH_QUESTION';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_SETTINGS = 'SET_SETTINGS';

export const loginUserAction = (payload) => ({
  type: USER_LOGIN,
  payload,
});

export const fetchQuestionsAction = (payload) => ({
  type: FETCH_QUESTION,
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
const settings = (settingsQuestion) => {
  const amount = settingsQuestion.amount !== ''
    ? `amount=${settingsQuestion.amount}` : 'amount=5';
  const category = settingsQuestion.category !== 'any'
    ? `&category=${settingsQuestion.category}` : '';
  const difficulty = settingsQuestion.difficulty !== 'any'
    ? `&difficulty=${settingsQuestion.difficulty}` : '';
  const type = settingsQuestion.type !== 'any'
    ? `&type=${settingsQuestion.type}` : '';
  const encode = settingsQuestion.enconde !== ''
    ? `&encode=${settingsQuestion.enconde}` : '';
  return [amount, category, difficulty, type, encode];
};

export const getQuestionsActionThunk = (settingsQuestion, token) => async (dispatch) => {
  try {
    const [amount, category, difficulty, type, encode] = settings(settingsQuestion);
    dispatch(isFetchingAction());
    const fq = `https://opentdb.com/api.php?${amount}${category}${difficulty}${type}${encode}&token=${token}`;
    console.log(fq);
    const response = await fetch(fq);
    // const response = await fetch(`https://opentdb.com/api.php?amount=${amountQuestion}&token=${token}`);
    const json = await response.json();
    if (json.response_code === 0) {
      dispatch(fetchQuestionsAction(json.results));
    } else {
      throw new Error('Token inválido, tentando atualizar o token, aguarde.');
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateTimer = () => ({
  type: UPDATE_TIMER,
});

export const timerResetAction = () => ({
  type: TIMER_RESET,
});

export const setIdInterval = (payload) => ({
  type: ID_INTERVAL,
  payload,
});

export const setQuestionLengthAction = (payload) => ({
  type: QUESTION_LENGTH,
  payload,
});

export const setStateInReduxAction = (state) => ({
  type: SET_SETTINGS,
  payload: state,
});

export const setQuestionAction = (payload) => ({
  type: FETCH_QUESTION,
  payload,
});

export const setCategories = (payload) => ({
  type: SET_CATEGORIES,
  payload,
});

export const fetchCategoriesThunk = () => async (dispatch) => {
  dispatch(isFetchingAction());
  const response = await fetch('https://opentdb.com/api_category.php');
  const categories = await response.json();
  dispatch(setCategories(categories));
};
