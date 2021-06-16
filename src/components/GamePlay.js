import React from 'react';
import { useSelector } from 'react-redux';

export default function GamePlay() {
  const { questions } = useSelector((state) => state.gameReducer);

  return (
    <div>
      <h1 data-testid="question-category">
        Category:
        {
          questions[0].category
        }
      </h1>
      <h2 data-testid="question-text">{ questions[0].question }</h2>
      <button
        type="button"
        data-testid="correct-answer"
      >
        {
          questions[0].correct_answer
        }
      </button>
      {questions[0].incorrect_answers
        .map((incorretAnsewr, index) => (
          <button
            type="button"
            data-testid={ `wrong-answer-${index}` }
            key={ index }
          >
            { incorretAnsewr }
          </button>))}
    </div>
  );
}
