import React, { Component } from 'react'
import { connect } from 'react-redux'

class FeedbackHeader extends Component {
  render() {
    const { name, assertions, score, gravatarEmail } = this.props.playerInfo;
    return (
      <div>
        <img 
          src={ gravatarEmail } 
          alt="" 
          data-testid="header-profile-picture"
        />

        <h2 data-testid="header-player-name" >{ name }</h2>

        <p data-testid="header-score">{ score }</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  playerInfo: state.jogo.player
})

export default connect(mapStateToProps)(FeedbackHeader);
