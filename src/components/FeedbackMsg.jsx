import React, { Component } from 'react'
import { connect } from 'react-redux'

class FeedbackMsg extends Component {
  renderMessage = () => {
    const { assertions } = this.props.playerInfo;

    if (assertions < 3) {
      return 'Podia ser melhor...';
    } else {
      return 'Mandou bem!';
    }
  }

  render() {
    return (
      <div data-testid="feedback-text">
        {this.renderMessage()}
      </div>
    )
  }
}

const mapStateToProps = ({jogoReducer: { player }}) => ({
  assertions: player.assertions,
})

export default connect(mapStateToProps)(FeedbackMsg);
