const INITIAL_STATE = {
  user: {
    name: '',
    email: '',
  },
};

function userReducer(state = INITIAL_STATE, { payload, type }) {
  switch (type) {
  case '':
    return state + payload;
  default:
    return state;
  }
}

export default userReducer;
