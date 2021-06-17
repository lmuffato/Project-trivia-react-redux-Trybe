import questionsFormat from '../utils/questionsFormat';

const ApiGetQuestions = async (token) => {
  const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(url);
  const data = await response.json();

  const codeOfError = 3;
  if (data.response_code === codeOfError) {
    throw Error(data.response_code);
  }

  return questionsFormat(data.results);
};

export default ApiGetQuestions;
