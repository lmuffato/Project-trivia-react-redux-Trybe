import {
  REQUEST_API, REQUEST_API_ERROR, REQUEST_API_SUCESS,
} from '../actions/requestQuestions';

const INITIAL_STATE = {
  questions: [],
  isLoading: false,
  error: null,
};

function questionsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_API:
    return ({
      ...state,
      isLoading: true,
    });
  case REQUEST_API_SUCESS:
    return ({
      ...state,
      questions: action.payload,
      isLoading: false,
    });
  case REQUEST_API_ERROR:
    return ({
      ...state,
      isLoading: false,
      error: action.payload,
    });
  default:
    return state;
  }
}

export default questionsReducer;
