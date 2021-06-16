import React, { Component } from 'react';
import Header from '../components/Header';

class FeedBack extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionsCount: 3,
    };

    this.result = this.result.bind(this);
    this.performance = this.performance.bind(this);
  }

  result() {
    const correctAnswer = 3;
    const { questionsCount } = this.state;
    if (questionsCount < correctAnswer) {
      return <p data-testid="feedback-text">Podia ser melhor...</p>;
    }
    return <p data-testid="feedback-text">Mandou bem!</p>;
  }

  performance() {
    const { questionsCount } = this.state;
    return (
      <div>
        <p
          data-testid="feedback-total-score"
        >
          {`Você acertou ${questionsCount} questões!`}
        </p>
        <p
          data-testid="feedback-total-question"
        >
          {`Um total de ${questionsCount} pontos`}
        </p>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Header />
        { this.result() }
        { this.performance() }
      </div>
    );
  }
}

export default FeedBack;
