export const RECEIVE_SCORE = 'RECEIVE_SCORE';

export const CLEAR_SCORE = 'CLEAR_SCORE';

export const setScore = (score) => ({ type: RECEIVE_SCORE, score });

export const resetScore = () => ({ type: CLEAR_SCORE });
