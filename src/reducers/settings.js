import { SETTINGS } from '../actions';

const INITIAL_STATE = {
  category: undefined,
  quantity: undefined,
  difficulty: undefined,
};

const settings = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
  case SETTINGS:
    return {
      category: payload.category,
      quantity: payload.quantity,
      difficulty: payload.difficulty,
    };
  default:
    return state;
  }
};

export default settings;
