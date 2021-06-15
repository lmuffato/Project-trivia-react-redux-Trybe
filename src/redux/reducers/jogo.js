import {
  GET_API,
  GET_API_ERROR,
  GET_API_SUCCESS,
} from '../actions/actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
    score: '',
    gravatarEmail: '',
  },
  loading: false,
  results: [],
};

const jogoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_API:
    return {
      ...state,
      loading: true,
    };

  case GET_API_SUCCESS:
    return {
      ...state,
      loading: false,
      results: action.payload,
    };

  case GET_API_ERROR:
    return {
      ...state,
      loading: false,
      results: action.payload.error,
    };

  default:
    return { ...state };
  }
};

export default jogoReducer;
