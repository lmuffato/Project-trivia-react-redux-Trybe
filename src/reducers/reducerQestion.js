import { REQUEST_API_GAME } from '../actions';

const INITIAL_STATE_GAME = {
  results: [],
};

const questionGame = (state = INITIAL_STATE_GAME, action) => {
  switch (action.type) {
  case REQUEST_API_GAME:
    return {
      ...state,
      results: [...action.payload.results],
    };
  default:
    return state;
  }
};

export default questionGame;
