import shuffleArray from '../utils/shuffleArray';

const ApiGetQuestions = async (token = '') => {
  const url = `https://opentdb.com/api.php?amount=5${token}`;
  const response = await fetch(url);
  const { results } = await response.json();

  const questions = results.map((data) => ({
    category: data.category,
    question: data.question,
    type: data.type,
    correctAnswer: data.correct_answer,
    difficulty: data.difficulty,
    incorrectAnswers: shuffleArray(data.incorrect_answers),
    questions: shuffleArray([...data.incorrect_answers, data.correct_answer]),
  }));

  return questions;
};

export default ApiGetQuestions;
