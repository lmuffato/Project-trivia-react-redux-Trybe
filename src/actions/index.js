const PLAYER = 'PLAYER';
const RANKING = 'RANKING';
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

const setRanking = ({ name, score, picture }) => ({
  type: RANKING,
  payload: {
    name,
    score,
    picture,
  },
});

export {
  PLAYER,
  RANKING,
  SCORE,
  SETTINGS,
  login,
  setScore,
  setSettings,
  setRanking,
};
