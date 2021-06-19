const PLAYER = 'PLAYER';
const SCORE = 'SCORE';

const login = (name, email, assertions = 0, score = 0) => ({
  type: PLAYER,
  payload: {
    name,
    gravatarEmail: email,
    assertions,
    score,
  },
});

const setScore = (assertions, score) => ({
  type: SCORE,
  payload: {
    assertions,
    score,
  },
});

export {
  PLAYER,
  SCORE,
  login,
  setScore,
};
