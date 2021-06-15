const PLAYER = 'PLAYER';
const login = (payload) => ({
  type: PLAYER,
  payload,
});

//  { name, gravatarEmail, assertions, score }

export default { PLAYER, login };
