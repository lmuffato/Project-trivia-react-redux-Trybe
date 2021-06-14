import {
  GET_QUESTIONS,
  ADD_QUESTIONS_SUCCESS,
  ADD_QUESTIONS_ERROR,
} from '../actions/index';

const INITIAL_STATE = {
  apiError: '',
  apiResponse: [],
  isloading: false,
};

const apiResponse = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_QUESTIONS:
    return { ...state, isloading: true };
  case ADD_QUESTIONS_SUCCESS:
    return { ...state, isloading: false, apiResponse: [action.payload] };
  case ADD_QUESTIONS_ERROR:
    return { ...state, isloading: false, apiError: action.payload };
  default:
    return state;
  }
};

export default apiResponse;
