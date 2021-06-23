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
export const SET_STATE_CLASS = 'SET_STATE_CLASS';
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
  const encode = settingsQuestion.encode !== ''
    ? `&encode=${settingsQuestion.encode}` : '';
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

const fetchQuestions = async (settingsQuestion, dispatch) => {
  const tokenNow = getLocalStorage('token')
    ? getLocalStorage('token') : await fetchToken();
  const [amount, category, difficulty, type, encode] = settings(settingsQuestion);
  dispatch(isFetchingAction());
  const trivia = `https://opentdb.com/api.php?${amount}${category}${difficulty}${type}${encode}&token=${tokenNow}`;
  console.log('eita ein fetchQuestions');
  const response = await fetch(trivia);
  return response.json();
};

const responseType = async (json, settingsQuestion, dispatch) => {
  const RESPONSE_CODE_0 = 0;
  const RESPONSE_CODE_3 = 3;
  const RESPONSE_CODE_4 = 4;
  let jsonNew;

  switch (json.response_code) {
  case RESPONSE_CODE_0:
    dispatch(fetchQuestionsAction(json.results));
    return;
  case RESPONSE_CODE_3:
  case RESPONSE_CODE_4:
    await fetchToken();
    jsonNew = await fetchQuestions(settingsQuestion, dispatch);
    dispatch(fetchQuestionsAction(jsonNew.results));
    return jsonNew;
  default:
    console.log('ta tirando ein');
    break;
  }
};

const initialSettings = {
  amount: 5,
  category: 'any',
  difficulty: 'any',
  type: 'any',
  encode: '',
};

export const getQuestionsActionThunk = (settingsQuestion = initialSettings) => (
  async (dispatch) => {
    try {
      const json = await fetchQuestions(settingsQuestion, dispatch);
      responseType(json, settingsQuestion, dispatch);
    } catch (error) {
      console.error(error);
    }
  });

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

// export const setStateInReduxAction = (state) => ({
//   type: SET_STATE_CLASS, // SET_STATE_CLASS
//   payload: state, // { nameClass, stateClass }
// });

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
