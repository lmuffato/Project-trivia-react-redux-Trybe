// export const ACTION_INICIAL = 'ACTION_INICIAL';
export const REQUEST_API_GAME = 'REQUEST_API_GAME';

export const requestApiGame = (payload) => ({
  type: REQUEST_API_GAME,
  payload,
});

const requestApiForGame = async () => {
  const tokenUser = localStorage.getItem('token');
  const numOfQuestions = 5;
  const api = await fetch(`https://opentdb.com/api.php?amount=${numOfQuestions}&token=${tokenUser}`);
  const treatmentJson = await api.json();
  return treatmentJson;
};

export const requestQuestion = () => async (dispatch) => {
  const apiQuestion = await requestApiForGame();
  console.log(apiQuestion);
  dispatch(requestApiGame(apiQuestion));
};
