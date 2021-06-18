import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/Header';

class Feedback extends React.Component {
  constructor() {
    super();
    this.feedbackMessage = this.feedbackMessage.bind(this);
  }

  feedbackMessage() {
    const { assertions } = this.props;
    const three = 3;
    if (assertions < three) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  render() {
    const { assertions, score } = this.props;
    console.log(typeof (assertions));
    return (
      <>
        <Header />
        <p>
          Quantidade de acertos:
          <span data-testid="feedback-total-question">
            { assertions }
          </span>
        </p>
        <p>
          Sua pontuação:
          <span data-testid="feedback-total-score">
            { score }
          </span>
        </p>
        <p data-testid="feedback-text">
          { this.feedbackMessage() }
        </p>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.user.assertions,
  score: state.user.score,
});

export default connect(mapStateToProps)(Feedback);
