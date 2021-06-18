import { questionAPI } from '../services/API';

export const GENERATE_QUESTION = 'GENERATE_QUESTION';

export const REQUEST_QUESTION = 'REQUEST_QUESTION';

export const requestQuestion = () => ({
  type: REQUEST_QUESTION,
});

export const generateQuestion = (state) => ({
  type: GENERATE_QUESTION,
  state,
});

const requestAPIthunk = () => (dispatch) => {
  dispatch(requestQuestion());
  questionAPI().then((response) => {
    dispatch(generateQuestion(response));
  });
};

export default requestAPIthunk;
