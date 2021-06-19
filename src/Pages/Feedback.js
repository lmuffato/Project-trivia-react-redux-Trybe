import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../Componentes/Header';
import './feedback.css';
// import PropTypes from 'prop-types';

class Feedback extends React.Component {
  constructor() {
    super();

    this.feedbackMensage = this.feedbackMensage.bind(this);
  }

  // Requisito 13 (Método de mensagens de feedback)
  feedbackMensage() {
    // const { assertionsState } = this.props;
    const simulatingHits = 1;
    const THREE = 3;
    if (simulatingHits < THREE) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  render() {
    // const { assertionsState, scoreState } = this.props;
    // const scoreState = 10;
    const assertionsState = 1;
    const storagePlayer = JSON.parse(localStorage.getItem('state'));
    const { score } = storagePlayer.player;
    return (
      <div>
        {/* Requisito 12 */}
        <Header />
        {/* Requisito 13 */}
        <div className="feedback-mensage">
          <p data-testid="feedback-text">{ this.feedbackMensage() }</p>
        </div>
        {/* Requisito 14 */}
        <section className="feedback-section">
          <p data-testid="feedback-total-score">
            { `Placar final: ${score}` }
          </p>
          <p data-testid="feedback-total-question">
            { `Você acertou ${assertionsState} questões` }
          </p>
        </section>
        <div className="feedback-buttons">
          {/* Requisito 15 */}
          <Link to="/">
            <button data-testid="btn-play-again" type="button">Jogar novamente</button>
          </Link>
          {/* Requisito 16 */}
          <Link to="/ranking">
            <button data-testid="btn-ranking" type="button">Ver Ranking</button>
          </Link>
        </div>
      </div>
    );
  }
}

// Feedback.propTypes = {
//   assertionsState: PropTypes.number.isRequired,
//   scoreState: PropTypes.number.isRequired,
// };

// const mapStateProps = (state) => ({
//   assertionsState: state.player.assertions,
//   scoreState: state.player.score,
// });

export default connect(null, null)(Feedback);
