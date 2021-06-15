import { GET_PLACAR, GET_QUESTION, GET_QUESTION_SUCCESS } from '../actions';

const INITIAL_STATE = {
  placar: 0,
  perguntas: [],
};

const gamePage = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_PLACAR:
    return {
      ...state,
      placar: state.placar + payload,
    };
  case GET_QUESTION:
    return state;
  case GET_QUESTION_SUCCESS:
    return {
      ...state,
      perguntas: [...payload],
    };
  default:
    return state;
  }
};

export default gamePage;
