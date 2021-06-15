import { PLAYER } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
  },
};

const playerStorage = JSON.parse(localStorage.getItem('player'));

const playerReducer = (state = playerStorage || INITIAL_STATE, action) => {
  console.log(action);
  const { payload } = action;
  switch (action.type) {
  case PLAYER:
    return {
      player: payload,
    };
  default: return state;
  }
};

export default playerReducer;
