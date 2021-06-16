const INITIAL_STATE = {
  amount: 5,
  time: 30,
};

export default function configs(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'CHANGE_CONFIGS':
    return { state: action.configs };
  default:
    return state;
  }
}
