import { UPDATE_CATEGORY } from '../actions/actionsTypes';

const INNITAL_STATE = {
  categoryID: '',
  dificullt: '',
  type: '',
};

const config = (state = INNITAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_CATEGORY:
    return {
      ...state,
      categoryID: action.payload,
    };
  default:
    return state;
  }
};

export default config;
