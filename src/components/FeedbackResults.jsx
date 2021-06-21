import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FeedbackResults extends Component {
  render() {
    const { score, assertions } = this.props;
    return (
      <div>
        <h3>
          Total de pontos:
          {' '}
          <span data-testid="feedback-total-score">{ score }</span>
        </h3>

        <p>
          Acertou:
          {' '}
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

const mapStateToProps = ({ game }) => ({
  assertions: game.player.assertions,
  score: game.player.score,
});

FeedbackResults.propTypes = {
  score: PropTypes.number,
  assetions: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, null)(FeedbackResults);
