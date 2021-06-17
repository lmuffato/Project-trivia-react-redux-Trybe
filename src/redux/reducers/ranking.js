import { UPDATE_RANKING } from '../actions/actionsTypes';

const INNITAL_STATE = [];

const ranking = (state = INNITAL_STATE, action) => {
  localStorage.setItem('ranking', JSON.stringify([...state, action.payload]));
  switch (action.type) {
  case UPDATE_RANKING:
    return [
      ...state,
      action.payload,
    ];
  default:
    return state;
  }
};

export default ranking;
