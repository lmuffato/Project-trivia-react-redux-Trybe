import { NAME } from '../../common/def';

export default function nameAction(payload) {
  return {
    type: NAME,
    payload,
  };
}
