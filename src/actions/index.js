export const NEW_EMAIL = 'NEW_EMAIL';
export const NEW_TOKEN = 'NEW_TOKEN';
export const NEW_QUESTIONS = 'NEW_QUESTIONS';
export const CORRET_ANSWER = 'CORRECT_ANSWER';

export const newEmail = (payload) => ({
  type: NEW_EMAIL,
  payload,
});

export const newToken = (payload) => ({
  type: NEW_TOKEN,
  payload,
});

// ** EXEMPLO **
export const getCorrectAnswersToStore = ({ score, assertions }) => ({
  type: CORRET_ANSWER,
  score,
  assertions,
});
