import {
  USER_EMAIL, USER_LOGIN, USER_SCORE, ASSERTION, RESET_PLAYER } from '../../common/def';

const INITIAL_STATE = { player: {
  email: '',
  name: '',
  score: 0,
  assertions: 0,
} };

export default function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_EMAIL:
    return {
      ...state,
      player: {
        ...state.player,
        email: action.payload,
      },
    };
  case USER_LOGIN:
    return {
      ...state,
      player: {
        ...state.player,
        name: action.payload,
      },
    };
  case USER_SCORE:
    return {
      ...state,
      player: {
        ...state.player,
        score: state.player.score + Number(action.payload),
      },
    };
  case ASSERTION:
    return {
      ...state,
      player: {
        ...state.player,
        assertions: state.player.assertions + 1,
      },
    };
  case RESET_PLAYER:
    return {
      ...state,
      player: {
        email: '',
        name: '',
        score: 0,
        assertions: 0,
      },
    };
  default:
    return state;
  }
}
