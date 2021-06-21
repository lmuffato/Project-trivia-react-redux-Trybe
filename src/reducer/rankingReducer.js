import { UPDATE_RANKING } from '../actions';

const INITIAL_STATE = {
  name: '',
  picture: '',
  score: 0,
};

const rankingReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case UPDATE_RANKING:
    return {
      ...state,
      score: payload,
    };
  default:
    return state;
  }
};

export default rankingReducer;
