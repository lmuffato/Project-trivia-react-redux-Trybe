import { getLocalStorage, setLocalStorage } from '../../helper';

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
export const SET_CORRECT_ANSWER = 'SET_CORRECT_ANSWER';

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

// const questionsMock = [
//   {
//     category: 'History',
//     type: 'multiple',
//     difficulty: 'easy',
//     question: 'The idea of Socialism was articulated and advanced by whom?',
//     correct_answer: 'Karl Marx',
//     incorrect_answers: [
//       'Vladimir Lenin',
//       'Joseph Stalin',
//       'Vladimir Putin',
//     ],
//   },
//   {
//     category: 'History',
//     type: 'multiple',
//     difficulty: 'easy',
//     question: 'In 1720, England was in massive debt, and became in involved in the South Sea Bubble. Who was the main mastermind behind it?',
//     correct_answer: 'John Blunt',
//     incorrect_answers: [
//       'Daniel Defoe',
//       'Robert Harley',
//       'John Churchill',
//     ],
//   },
//   {
//     category: 'Entertainment: Video Games',
//     type: 'boolean',
//     difficulty: 'medium',
//     question: 'TF2: The Heavy&#039;s voice actor, Gary Schwartz, voices the Demoman as well ',
//     correct_answer: 'True',
//     incorrect_answers: [
//       'False',
//     ],
//   },
//   {
//     category: 'Geography',
//     type: 'multiple',
//     difficulty: 'easy',
//     question: 'The Alps are a mountain range on which continent?',
//     correct_answer: 'Europe',
//     incorrect_answers: [
//       'North America',
//       'Asia',
//       'Africa',
//     ],
//   },
//   {
//     category: 'Entertainment: Comics',
//     type: 'multiple',
//     difficulty: 'medium',
//     question: 'Found in the Marvel Comics fictional universe, what is the name of the nearly indestructible metal that coats Wolverine&#039;s bones and claws?',
//     correct_answer: 'Adamantium',
//     incorrect_answers: [
//       'Titanium',
//       'Vibranium',
//       'Carbonadium',
//     ],
//   },
// ];

const fetchToken = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  setLocalStorage('token', data.token);
  return data.token;
};

export const getQuestionsActionThunk = (settingsQuestion) => async (dispatch) => {
  try {
    const tokenNow = getLocalStorage('token')
      ? getLocalStorage('token') : await fetchToken();
    const [amount, category, difficulty, type, encode] = settings(settingsQuestion);
    dispatch(isFetchingAction());
    const fq = `https://opentdb.com/api.php?${amount}${category}${difficulty}${type}${encode}&token=${tokenNow}`;
    console.log(fq);
    const response = await fetch(fq);
    const json = await response.json();
    if (json.response_code === 0) {
      console.table(json.results);
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

export const setCorrectAnswerAction = (payload) => ({
  type: SET_CORRECT_ANSWER,
  payload,
});
