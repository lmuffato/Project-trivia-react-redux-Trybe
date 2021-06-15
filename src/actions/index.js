export const USER = 'USER';
export const RANKING = 'RANKING';
export const QUESTIONS_API = 'QUESTIONS_API';
export const TOKEN = 'TOKEN';

export const user = (payload) => ({
  type: 'USER',
  payload,
});

export const ranking = (payload) => ({
  type: 'RANKING',
  payload,
});

export const questionsApi = (payload) => ({
  type: 'QUESTIONS_API',
  payload,
});

export const getToken = (payload) => ({
  type: 'TOKEN',
  payload,
});
