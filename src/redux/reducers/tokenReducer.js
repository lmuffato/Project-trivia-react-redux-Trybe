import { GET_TOKEN, GET_TOKEN_SUCCESS, GET_TOKEN_ERROR } from '../actions';

const getLocalStorage = (key, initial) => {
  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch (error) {
    return initial;
  }
};

const INITIAL_STATE = {
  data: getLocalStorage('token', null),
  error: null,
  loading: null,
};

function tokenReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_TOKEN:
    return {
      ...state,
      loading: true,
    };
  case GET_TOKEN_SUCCESS:
    return {
      ...state,
      data: action.payload,
      loading: false,
    };
  case GET_TOKEN_ERROR:
    return {
      ...state,
      error: action.payload,
      loading: false,
      data: null,
    };
  default:
    return state;
  }
}

export default tokenReducer;
