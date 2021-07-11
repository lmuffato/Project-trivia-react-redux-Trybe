import { USER_INFOS } from './actions/actionTypes';

const userInfo = (payload) => ({
  type: USER_INFOS,
  payload,
});

export default userInfo;
