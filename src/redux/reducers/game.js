import { GET_PLACAR, GET_QUESTION,
  GET_QUESTION_SUCCESS, SAVE_USER, RESET_PLACAR } from '../actions';

const INITIAL_STATE = {
  placar: 0,
  perguntas: [],
  users: [],
};

const gamePage = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_PLACAR:
    return {
      ...state,
      placar: state.placar + +(payload.placar),
    };
  case GET_QUESTION:
    return state;
  case GET_QUESTION_SUCCESS:
    return {
      ...state,
      perguntas: [...payload],
    };
  case SAVE_USER:
    return {
      ...state,
      users: [...state.users, payload],
    };
  case RESET_PLACAR:
    return { ...state, placar: 0 };
  default:
    return state;
  }
};

export default gamePage;
