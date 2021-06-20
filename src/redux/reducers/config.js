import { UPDATE_CATEGORY } from '../actions/actionsTypes';

const INNITAL_STATE = {
  category: '',
  difficult: '',
  type: '',
};

const config = (state = INNITAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_CATEGORY:
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
};

export default config;
