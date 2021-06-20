import {
  REQUEST_API,
  REQUEST_TOKEN,
  REQUEST_QUESTION_SUCESS,
  REQUEST_QUESTION_FAIL,
  REQUEST_CATEGORIES,
} from '../actions/index';

const INITIAL_STATE = {
  token: '',
  isLoading: false,
  questions: [],
  erro: null,
  categories: [],
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      isLoading: true,
    };

  case REQUEST_TOKEN:
    return {
      ...state,
      token: action.payload,
      isLoading: false,
    };

  case REQUEST_QUESTION_SUCESS:
    return {
      ...state,
      questions: action.payload,
      isLoading: false,
    };

  case REQUEST_QUESTION_FAIL:
    return {
      ...state,
      error: action.payload.error,
      isLoading: false,
    };
  case REQUEST_CATEGORIES:
    return {
      ...state,
      categories: action.payload,
    };

  default:
    return state;
  }
};

export default game;
