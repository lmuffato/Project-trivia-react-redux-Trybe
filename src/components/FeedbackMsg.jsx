import React, { Component } from 'react';
import { connect } from 'react-redux';
import { number } from 'prop-types';
import ReactAudioPlayer from 'react-audio-player';

const MIN_ASSERTIONS = 3;

class FeedbackMsg extends Component {
  renderMessage() {
    const { assertions } = this.props;

    if (assertions < MIN_ASSERTIONS) {
      return (
        <div>
          <h1>Podia ser melhor...</h1>
          <ReactAudioPlayer
            src="https://www.myinstants.com/media/sounds/perdeu_8w6FeZM.mp3"
            autoPlay
            controls
            className="music"
          />
        </div>
      );
    }
    return (
      <div>
        <h1>Mandou bem!</h1>
        <ReactAudioPlayer
          src="https://www.myinstants.com/media/sounds/ayrton-senna-tema-da-vitoria.mp3"
          autoPlay
          controls
          className="music"
        />
      </div>
    );
  }

  render() {
    return (
      <div data-testid="feedback-text">
        {this.renderMessage()}
      </div>
    );
  }
}

const mapStateToProps = ({ game: { player } }) => ({
  assertions: player.assertions,
});

FeedbackMsg.propTypes = {
  assertions: number,
}.isRequired;

export default connect(mapStateToProps, null)(FeedbackMsg);
