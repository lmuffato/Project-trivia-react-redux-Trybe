import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FeedbackResult extends Component {
  render() {
    const { score, assertions } = this.props;
    return (
      <div>
        <p>
          Total de pontos:
          {' '}
          <span data-testid="feedback-total-score">{ score }</span>
        </p>

        <p>
          Acertou
          <span data-testid="feedback-total-question">
            { assertions }
          </span>

          {' '}
          {' '}
          perguntas de
          {' '}
          {/* { totalQuestions } */}
        </p>
      </div>
    );
  }
}

const mapStateToProps = ({ jogoReducer }) => ({
  assertions: jogoReducer.player.assertions,
  score: jogoReducer.player.score,
});

FeedbackResult.propTypes = {
  score: PropTypes.number,
  assetions: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, null)(FeedbackResult);
