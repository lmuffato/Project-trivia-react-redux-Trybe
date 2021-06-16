import { SUM_SCORE } from '../actions';

const INITIAL_STATE = {
  total: 0,
};

const calcScore = (payload) => {
  let difficulty = 1;
  const mediumDifficulty = 2;
  const hardDifficulty = 3;
  if (payload.difficulty === 'medium') difficulty = mediumDifficulty;
  if (payload.difficulty === 'hard') difficulty = hardDifficulty;
  return payload.seconds * difficulty;
};

const scoreReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUM_SCORE: {
    const score = calcScore(action.payload);
    return {
      ...state,
      total: state.total + score,
    };
  }
  default:
    return state;
  }
};

export default scoreReducer;
