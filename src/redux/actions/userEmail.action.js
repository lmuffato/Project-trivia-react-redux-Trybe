import { USER_EMAIL } from '../../common/def';

export default function userEmail(email) {
  return {
    type: USER_EMAIL,
    payload: email,
  };
}
