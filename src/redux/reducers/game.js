import { GET_PLACAR } from '../actions';

const INITIAL_STATE = {
  placar: 0,
};

const gamePage = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_PLACAR:
    return {
      placar: state.placar + payload,
    };
  default:
    return state;
  }
};

export default gamePage;
