import {
  CHANGE_ASSERTIONS,
  INCREMENT_INDEX,
  REFRESH_SHUFFLE,
  REQUEST_API,
  REQUEST_API_ERROR,
  REQUEST_API_SUCESS,
} from '../actions/manageQuestions';

const INITIAL_STATE = {
  questions: [],
  index: 0,
  isLoading: false,
  error: null,
  shuffle: [],
  assertions: 0,
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
  case INCREMENT_INDEX:
    return ({
      ...state,
      index: state.index + 1,
    });
  case REFRESH_SHUFFLE:
    return ({
      ...state,
      shuffle: action.payload,
    });
  case CHANGE_ASSERTIONS:
    return ({
      ...state,
      assertions: state.assertions + 1,
    });
  default:
    return state;
  }
}

export default questionsReducer;
