export const LOGIN = 'LOGIN';

export function actionLogin(name, email) {
  return ({
    type: LOGIN,
    payload: {
      name, email,
    },
  });
}

export const gravatarRequest = (gravatar) => ({
  type: 'GRAVATAR',
  gravatar,
});

export const loadingRequest = () => ({
  type: 'IS_LOADING',
});

export const errorRequest = (error) => ({
  type: 'ERROR_REQUEST',
  error,
});

export const successRequest = ({ data, name, email }) => ({
  type: 'SUCCESS_REQUEST',
  data,
  objState: {
    player: {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail: email,
    },
  },
});

export const successQuestions = (data) => ({
  type: 'SUCCESS_QUESTIONS',
  data,
});

// Função retirada do site https://www.horadecodar.com.br/2021/05/10/como-embaralhar-um-array-em-javascript-shuffle/
const shuffleArray = (arr) => {
  // Loop em todos os elementos
  for (let i = arr.length - 1; i > 0; i -= 1) {
    // Escolhendo elemento aleatório
    const j = Math.floor(Math.random() * (i + 1));
    // Reposicionando elemento
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  // Retornando array com aleatoriedade
  return arr;
};

const handleResponse = ({ results }) => {
  const exportArray = results.map((receivedQuestion) => {
    const { category, type, difficulty, question, correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = receivedQuestion;
    const answersOrd = incorrectAnswers.map((text) => (
      { text,
        correct: false,
      }
    ));
    answersOrd.push(
      {
        text: correctAnswer,
        correct: true,
      },
    );
    const answers = shuffleArray(answersOrd);
    return { category, type, difficulty, question, answers };
  });
  return exportArray;
};

export const ThunkTrivia = (token) => (dispatch) => (fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
  .then((response) => (response.json()))
  .then((data) => dispatch(successQuestions(handleResponse(data)))));

export const ThunkAPI = (name, email) => async (dispatch) => {
  dispatch(loadingRequest());
  dispatch(actionLogin(name, email));

  fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => (response.json()))
    .then((data) => {
      dispatch(ThunkTrivia(data.token));
      dispatch(successRequest({ data, name, email }));
    });
};
