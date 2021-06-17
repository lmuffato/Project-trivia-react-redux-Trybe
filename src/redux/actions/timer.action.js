import { TIMER } from '../../common/def';

export default function timeLeftAction(payload) {
  return {
    type: TIMER,
    payload,
  };
}
