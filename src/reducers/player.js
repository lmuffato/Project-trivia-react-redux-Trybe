import { PLAYER } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    score: 0,
  },
};

const playerStorage = JSON.parse(localStorage.getItem('player'));

const playerFunction = (state = playerStorage || INITIAL_STATE, action) => {
  console.log(action);
  const { payload } = action;
  switch (action.type) {
  case PLAYER:
    return {
      ...state,
      player: { ...payload },
    };
  default: return state;
  }
};

export default playerFunction;
