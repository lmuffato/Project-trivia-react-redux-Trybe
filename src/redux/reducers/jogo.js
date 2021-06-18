import {
  GET_QUESTIONS,
  GET_QUESTIONS_ERROR,
  GET_QUESTIONS_SUCCESS,
  UPDATE_SCORE,
  SET_ANSWER_VISIBILITY,
  NEXT_QUESTION,
  LAST_QUESTION,
} from '../actions/actions';

const INITIAL_STATE = {
  player: {
    assertions: 0,
    score: 0,
  },
  loading: false,
  questions: [],
  currentQuestionIndex: 0,
  answer_visibility: 'hide',
  redirectToFeedback: false,
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_QUESTIONS:
    return {
      ...state,
      loading: true,
    };

  case GET_QUESTIONS_SUCCESS:
    return {
      ...state,
      loading: false,
      questions: [...action.payload],
    };

  case GET_QUESTIONS_ERROR:
    return {
      ...state,
      loading: false,
      questions: action.payload.error,
    };

  case SET_ANSWER_VISIBILITY:
    return {
      ...state,
      answer_visibility: action.payload,
    };

  case NEXT_QUESTION:
    return {
      ...state,
      currentQuestionIndex: state.currentQuestionIndex + 1,
    };

  case UPDATE_SCORE:
    return { ...state,
      player: { ...state.player,
        score: state.player.score + action.payload,
        assertions: state.player.assertions + 1 } };

  case LAST_QUESTION:
    return {
      ...state,
      currentQuestionIndex: 0,
      redirectToFeedback: action.payload,
    };
  default:
    return state;
  }
};

export default gameReducer;
