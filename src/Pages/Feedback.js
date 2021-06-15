import React from 'react';
import { connect } from 'react-redux';
import Header from '../Componentes/Header';
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
    const scoreState = 100;
    const assertionsState = 5;
    return (
      <div>
        {/* Requisito 12 */}
        <Header />
        {/* Requisito 13 */}
        <div>
          <p data-testid="feedback-text">{ this.feedbackMensage() }</p>
        </div>
        {/* Requisito 14 */}
        <section>
          <p data-testid="feedback-total-score">
            { `Placar final: ${scoreState}` }
          </p>
          <p data-testid="feedback-total-question">
            { `Você acertou ${assertionsState} questões` }
          </p>
        </section>
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
