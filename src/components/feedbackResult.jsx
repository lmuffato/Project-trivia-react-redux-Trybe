import React, { Component } from 'react'
import { connect } from 'react-redux';

class feedbackResult extends Component {
  render() {
    const { score, assertions } = this.props.playerInfo;
    return (
      <div>
        <p>
          Total de ponto: <span data-testid="feedback-total-score">{ score }</span>
        </p>

        <p data-testid="feedback-total-question">Acertou { assertions } perguntas de { totalQuestions }</p>
      </div>
    )
  }
}


const mapStateToProps = ({jogoReducer}) => ({
  playerInfo: jogoReducer.player
})

export default connect(mapStateToProps)(feedbackResult)
