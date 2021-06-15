import {
  REQUEST_API, REQUEST_TOKEN, REQUEST_QUESTION_SUCESS, REQUEST_QUESTION_FAIL,
} from '../actions/index';

const INITIAL_STATE = {
  token: '',
  isLoading: false,
  questions: [],
  erro: null,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return ({
      ...state,
      isLoading: true,
    });

  case REQUEST_TOKEN:
    console.log('PASSOU O TOKEN');
    console.log(action.payload);
    return ({
      ...state,
      token: action.payload,
      isLoading: false,
    });

  case REQUEST_QUESTION_SUCESS:
    return ({
      ...state,
      questions: action.payload,
      isLoading: false,
    });

  case REQUEST_QUESTION_FAIL:
    return ({
      ...state,
      error: action.payload.error,
      isLoading: false,
    });

  default:
    return state;
  }
};

export default game;
