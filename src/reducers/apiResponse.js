import {
  GET_QUESTIONS,
  ADD_QUESTIONS_SUCCESS,
  ADD_QUESTIONS_ERROR,
  RESET,
} from '../actions/index';

const INITIAL_STATE = {
  apiError: '',
  apiResult: {},
  isLoading: false,
};

const apiResponse = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_QUESTIONS:
    return { ...state, isLoading: true };
  case ADD_QUESTIONS_SUCCESS:
    return { ...state, isLoading: false, apiResult: action.payload };
  case ADD_QUESTIONS_ERROR:
    return { ...state, isLoading: false, apiError: action.payload };
  case RESET:
    return INITIAL_STATE;
  default:
    return state;
  }
};

export default apiResponse;
