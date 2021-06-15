import { RANKING } from '../actions';

const RANKING_INITIAL_STATE = {
  ranking: [],
};

const user = (state = RANKING_INITIAL_STATE, action) => {
  switch (action.type) {
  case RANKING:
    return {
      name: action.payload,
      gravatarEmail: action.payload,
    };
  default:
    return state;
  }
};
export default user;
