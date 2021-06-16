import {
  GET_API,
  GET_API_ERROR,
  GET_API_SUCCESS,
  UPDATE_SCORE,
  SAVE_TIME,
} from '../actions/actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
  loading: false,
  results: [],
  time: 0,
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
      results: [...action.payload],
    };

  case GET_API_ERROR:
    return {
      ...state,
      loading: false,
      results: action.payload.error,
    };

  case UPDATE_SCORE:
    return {
      ...state,
      player: { ...state.player,
        score: state.player.score + action.payload,
        assertions: state.player.assertions + 1 },
    };

  case SAVE_TIME:
    return {
      ...state,
      time: action.payload,
    };

  default:
    return { ...state };
  }
};

export default jogoReducer;
