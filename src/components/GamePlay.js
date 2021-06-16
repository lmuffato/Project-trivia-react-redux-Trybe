import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userScore } from '../redux/actions/userScore.action';

export default function GamePlay(disabledOptions) {
  const { questions } = useSelector((state) => state.gameReducer);
  const dispatch = useDispatch();
  const [indexQuestions, setIndexQuestions] = useState(0);
  const [afterClicked, seTafterClicked] = useState(false);
  function clickOnOption(event) {
    console.log(disabledOptions); // Pode ser removido
    seTafterClicked(true);
    if (event.target.id === 'correct-answer') {
      return console.log('correto');
    } console.log('falso');
  }

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
        onClick={ (event) => clickOnOption(event) }
        id="correct-answer"
        type="button"
        data-testid="correct-answer"
        className={ afterClicked ? 'green-border' : '' }
        disabled={ estado }
      >
        {
          questions[0].correct_answer
        }
      </button>
      {questions[0].incorrect_answers
        .map((incorretAnsewr, index) => (
          <button
            type="button"
            onClick={ (event) => clickOnOption(event) }
            id={ `wrong-answer-${index}` }
            className={ afterClicked ? 'red-border' : '' }
            data-testid={ `wrong-answer-${index}` }
            key={ index }
            disabled={ estado }
          >
            { incorretAnsewr }
          </button>))}
    </div>
  );
}
