import { ID_INTERVAL } from '../action';

const initialState = {
  id: 'id setInterval',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case ID_INTERVAL:
    return { ...state, id: payload };
  default:
    return state;
  }
};
