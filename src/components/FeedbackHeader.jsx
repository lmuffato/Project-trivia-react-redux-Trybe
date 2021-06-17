import React, { Component } from 'react'
import { connect } from 'react-redux'

class FeedbackHeader extends Component {
  render() {
    const { name, score, gravatarEmail } = this.props.playerInfo;
    return (
      <header>
        <img 
          src={ gravatarEmail } 
          alt="" 
          data-testid="header-profile-picture"
        />

        <h2 data-testid="header-player-name" >{ name }</h2>

        <p data-testid="header-score">{ score }</p>
      </header>
    )
  }
}

const mapStateToProps = (state) => ({
  playerInfo: state.jogoReducer.player
})

export default connect(mapStateToProps)(FeedbackHeader);
