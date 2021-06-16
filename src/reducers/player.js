const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  assertions: '',
  score: '',
};

const player = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
  case 'PLAYER':
    return {
      name: payload.name,
      gravatarEmail: payload.gravatarEmail,
      assertions: payload.assertions,
      score: payload.score,
    };
  default:
    return state;
  }
};

export default player;
