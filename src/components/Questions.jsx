import React, { Component } from 'react';
import { shape, bool, string } from 'prop-types';
import parse from 'html-react-parser';

class Questions extends Component {
  render() {
    const { gameData, selectAnswer } = this.props;
    const { question, category, gameOn, shuffleAnswers, correctAnswer } = gameData;
    return (
      <>
        <div>
          <h3 data-testid="question-category">{category}</h3>
          <p data-testid="question-text">{parse(question)}</p>
        </div>
        <div className="options-content">
          {shuffleAnswers.map((query, index) => {
            if (query === correctAnswer) {
              return (
                <p
                  key={ `answer-${index}` }
                >
                  <button
                    type="button"
                    data-testid="correct-answer"
                    onClick={ selectAnswer }
                    className={ gameOn ? 'btn-alternative' : 'btn-alternative-correct' }
                    disabled={ !gameOn }
                  >
                    { parse(query) }
                  </button>
                </p>);
            }
            return (
              <p key={ `answer-${index}` }>
                <button
                  type="button"
                  data-testid={ `wrong-answer-${index}` }
                  onClick={ selectAnswer }
                  className={ gameOn ? 'btn-alternative' : 'btn-alternative-wrong' }
                  disabled={ !gameOn }
                >
                  { parse(query) }
                </button>
              </p>
            );
          })}
        </div>
      </>
    );
  }
}

Questions.propTypes = {
  gameData: shape({
    question: string,
    category: string,
    gameOn: bool,
    shuffleAnswers: string,
    correctAnswer: string,
  }),
}.isRequired;

export default Questions;
