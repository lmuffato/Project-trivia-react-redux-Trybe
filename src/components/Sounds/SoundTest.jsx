import React, { useState } from 'react';
import Sound from 'react-sound';
import musicMario from './BonusScreenSuperMarioWorld.mp3';

const Music = (
  handleSongLoading,
  handleSongPlaying,
  handleSongFinishedPlaying,
) => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={ () => setIsPlaying(!isPlaying) }
      >
        { !isPlaying ? 'Play' : 'Stop' }
      </button>
      <Sound
        url={ musicMario }
        playStatus={
          isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED
        }
        playFromPosition={ 1 }
        onLoading={ handleSongLoading }
        onPlaying={ handleSongPlaying }
        onFinishedPlaying={ handleSongFinishedPlaying }
      />
    </div>
  );
};

export default Music;
