import { FETCH_QUESTIONS } from '../../common/def';

export default function updateQuestion(value) {
  return {
    type: FETCH_QUESTIONS,
    payload: value,
  };
}
