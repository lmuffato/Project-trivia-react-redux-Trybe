const PLAYER = 'PLAYER';
const SCORE = 'SCORE';
const SETTINGS = 'SETTINGS';

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

const setSettings = ({ category, quantity, difficulty }) => ({
  type: SETTINGS,
  payload: {
    category,
    quantity,
    difficulty,
  },
});

export {
  PLAYER,
  SCORE,
  SETTINGS,
  login,
  setScore,
  setSettings,
};
