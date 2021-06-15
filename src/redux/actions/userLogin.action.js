import { USER_LOGIN } from '../../common/def';

export default function userLogin(user) {
  return {
    type: USER_LOGIN,
    payload: user,
  };
}
