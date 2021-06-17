export const userValidation = (state) => {
  const emailValidator = /^[\S.]+@[a-z]+\.\w{2,3}$/g.test(state.email);
  const USER_NAME_MIN_LENGTH = 2;
  return !(emailValidator && state.user.length > USER_NAME_MIN_LENGTH);
};

export const updateLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const updateUserScore = (timer, difficulty) => {
  const POINT_BASE = 10;
  const pointDifficulty = {
    hard: 3,
    medium: 2,
    easy: 1,
  };
  return POINT_BASE + (timer * pointDifficulty[difficulty]);
};

export const showFeedbackMessage = (score) => {
  const minAssertion = 3;
  if (score < minAssertion) return 'Podia ser melhor...';
  return 'Mandou bem!';
};
