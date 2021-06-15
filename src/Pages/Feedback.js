import React from 'react';
import { connect } from 'react-redux';
import Header from '../Componentes/Header';
// import PropTypes from 'prop-types';

class Feedback extends React.Component {
  constructor() {
    super();

    this.feedbackMensage = this.feedbackMensage.bind(this);
  }

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
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">{ this.feedbackMensage() }</p>
      </div>
    );
  }
}

// Feedback.propTypes = {
//   assertionsState: PropTypes.number.isRequired,
// };

// const mapStateProps = (state) => ({
//   assertionsState: state.player.assertions,
// });

export default connect(null, null)(Feedback);
