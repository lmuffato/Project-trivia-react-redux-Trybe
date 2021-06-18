const PLAYER = 'PLAYER';

const login = (name, email, assertions = 0, score = 0) => ({
  type: PLAYER,
  payload: {
    name,
    gravatarEmail: email,
    assertions,
    score,
  },
});

export {
  PLAYER,
  login,
};
