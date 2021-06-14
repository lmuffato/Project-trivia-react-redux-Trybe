const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: 0,
};

function userReducer(store = INITIAL_STATE, action) {
  switch (action.type) {
  case 'REGISTER_USER':
    return { store: action.payload };
  default:
    return store;
  }
}

export default userReducer;
