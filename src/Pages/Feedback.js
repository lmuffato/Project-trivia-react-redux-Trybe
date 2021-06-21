import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../Componentes/Header';
import './feedback.css';

class Feedback extends React.Component {
  constructor() {
    super();

    this.feedbackMensage = this.feedbackMensage.bind(this);
  }

  // Requisito 13 (Método de mensagens de feedback)
  feedbackMensage(assertions) {
    const THREE = 3;
    if (assertions < THREE) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  render() {
    const storagePlayer = JSON.parse(localStorage.getItem('state'));
    const { score, assertions } = storagePlayer.player;
    return (
      <div>
        {/* Requisito 12 */}
        <Header />
        {/* Requisito 13 */}
        <div className="feedback-mensage">
          <h1 data-testid="feedback-text">{ this.feedbackMensage(assertions) }</h1>
        </div>
        {/* Requisito 14 */}
        <section className="feedback-section">
          <p>
            {'Placar final: '}
            <span className="blink" data-testid="feedback-total-score">{ score }</span>
          </p>
          <p>
            { 'Você acertou ' }
            <span data-testid="feedback-total-question">{ assertions }</span>
            { ' questões' }
          </p>
        </section>
        <div className="feedback-buttons">
          {/* Requisito 15 */}
          <Link to="/">
            <button
              className="feedback-button"
              data-testid="btn-play-again"
              type="button"
            >
              Jogar novamente
            </button>
          </Link>
          {/* Requisito 16 */}
          <Link to="/ranking">
            <button
              className="feedback-button"
              data-testid="btn-ranking"
              type="button"
            >
              Ver Ranking
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(Feedback);
