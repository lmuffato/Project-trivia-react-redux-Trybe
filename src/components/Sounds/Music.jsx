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
        { !isPlaying ? 'Com Musica!' : 'Sem Musica' }
      </button>
      <Sound
        volume={ 30 }
        autoLoad="true"
        loop="true"
        url={ musicMario }
        playStatus={
          isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED
        }
        playFromPosition={ 0 }
        onLoading={ handleSongLoading }
        onPlaying={ handleSongPlaying }
        onFinishedPlaying={ handleSongFinishedPlaying }
      />
    </div>
  );
};

export default Music;
