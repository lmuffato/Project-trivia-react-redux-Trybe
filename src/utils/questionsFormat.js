import dataTestid from './dataTestid';
import shuffleArray from './shuffleArray';

const questionsFormat = (results) => results.map((data) => ({
  category: data.category,
  question: data.question,
  type: data.type,
  correctAnswer: data.correct_answer,
  incorrectAnswers: shuffleArray(data.incorrect_answers),
  difficulty: data.difficulty,

  alternatives: shuffleArray([...dataTestid(data.incorrect_answers),
    { [data.correct_answer]: 'correct-answer' }]),
}));

export default questionsFormat;
