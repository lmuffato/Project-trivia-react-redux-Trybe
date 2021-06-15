import { USER_SCORE } from '../../common/def';

export default function userScore(user) {
  return {
    type: USER_SCORE,
    payload: user,
  };
}
