import React, { Component } from 'react';
import { number } from 'prop-types';

class DisplayPerformance extends Component {
  render() {
    const { assertions, score } = this.props;
    const questionsCount = 3;
    return (
      <div className="results-content">
        { assertions >= questionsCount
          ? <p data-testid="feedback-text"><strong>Mandou bem!</strong></p>
          : <p data-testid="feedback-text"><strong>Podia ser melhor...</strong></p> }
        <div className="percent-content">
          <p>
            <strong>
              Você acertou um total de &nbsp;
              <span data-testid="feedback-total-question">{assertions}</span>
              &nbsp;
              { assertions <= 1 ? 'pergunta!' : 'perguntas!' }
            </strong>
          </p>
          <p>
            <strong>
              Você obteve &nbsp;
              <span data-testid="feedback-total-score">{score}</span>
              &nbsp; pontos!
            </strong>
          </p>
        </div>
      </div>
    );
  }
}

DisplayPerformance.propTypes = {
  assertions: number,
  score: number,
}.isRequired;

export default DisplayPerformance;
