import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      assertions: 0,
    };
  }

  renderGoodScoore() {
    return (
      <h1 data-testid="feedback-text">Mandou bem!</h1>
    );
  }

  renderBadScore() {
    return (
      <h1 data-testid="feedback-text">Podia ser melhor...</h1>
    );
  }

  render() {
    // const storedInfo = JSON.parse(localStorage.getItem('state'));
    // const { player: { assertions, score } } = storedInfo;

    const { score, assertions } = this.state; //
    const minimalScore = 3;

    return (
      <div>
        <Header />
        { score >= minimalScore ? this.renderGoodScoore() : this.renderBadScore() }
        <h3 data-testid="feedback-total-question">
          {`Você acertou: ${assertions} questões`}
        </h3>
        <h3 data-testid="feedback-total-score">
          {`Sua pontuação final foi: ${score} pontos!`}
        </h3>
        <Link to="/ranking">
          <button type="submit" data-testid="btn-ranking">
            Ver Ranking
          </button>
        </Link>
        <Link to="/">
          <button type="submit" data-testid="btn-play-again">
            Jogar Novamente
          </button>
        </Link>
      </div>
    );
  }
}

export default Feedback;
