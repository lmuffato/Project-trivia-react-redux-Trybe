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
    return { payload };
  default:
    return state;
  }
};

export default player;
