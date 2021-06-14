import { SEND_USER } from '../actions';

const INIT_STATE = {
  email: '',
  userName: '',
};

const userReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
  case SEND_USER: {
    return action.dataUser;
  }
  default: return state;
  }
};

export default userReducer;
