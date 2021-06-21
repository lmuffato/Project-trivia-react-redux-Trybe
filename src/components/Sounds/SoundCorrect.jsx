import React from 'react';
import Sound from 'react-sound';
import soundCorrectCoin from './SuperMarioWorldCoinSound.mp3';

class SoundCorrect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      correctClicked: false,
    };
  }

  componentDidMount() {
    this.SoundCorrectFunc();
  }

  SoundCorrectFunc(
    handleSongLoading,
    handleSongPlaying,
    handleSongFinishedPlaying,
  ) {
    const { isPlaying } = this.state;
    const { correctClicked } = this.props;
    return (
      <div>
        {/* <button
          type="button"
          onClick={ () => this.setState({ isPlaying: !isPlaying }) }
        >
          { !isPlaying ? 'Play' : 'Stop' }
        </button> */}
        <Sound
          volume={ 100 }
          url={ soundCorrectCoin }
          playStatus={
            correctClicked ? Sound.status.PLAYING : Sound.status.STOPPED
          }
          playFromPosition={ 3 }
          onLoading={ handleSongLoading }
          onPlaying={ handleSongPlaying }
          onFinishedPlaying={ handleSongFinishedPlaying }
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.SoundCorrectFunc()}
      </div>
    );
  }
}

export default SoundCorrect;
