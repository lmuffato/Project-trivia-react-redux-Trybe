import React, { Component } from 'react';
import { connect } from 'react-redux';
import { number } from 'prop-types';

const MIN_ASSERTIONS = 3;

class FeedbackMsg extends Component {
  renderMessage() {
    const { assertions } = this.props;

    if (assertions < MIN_ASSERTIONS) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  render() {
    return (
      <div data-testid="feedback-text">
        {this.renderMessage()}
      </div>
    );
  }
}

const mapStateToProps = ({ jogoReducer: { player } }) => ({
  assertions: player.assertions,
});

FeedbackMsg.propTypes = {
  assertions: number,
}.isRequired;

export default connect(mapStateToProps, null)(FeedbackMsg);
