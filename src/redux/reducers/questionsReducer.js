import { GET_QUESTIONS, GET_QUESTIONS_ERROR, GET_QUESTIONS_SUCCESS } from '../actions';

const INITIAL_STATE = {
  data: [],
  error: null,
  loading: true,
};

function questionsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_QUESTIONS:
    return {
      ...state,
      data: [],
      loading: true,
    };
  case GET_QUESTIONS_SUCCESS:
    return {
      ...state,
      data: action.payload,
      loading: false,
    };
  case GET_QUESTIONS_ERROR:
    return {
      ...state,
      error: action.payload,
      loading: false,
    };
  default:
    return state;
  }
}

export default questionsReducer;
