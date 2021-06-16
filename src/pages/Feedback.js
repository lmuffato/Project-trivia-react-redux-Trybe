import React from 'react';

const Feedback = () => {
  const stateStorage = JSON.parse(localStorage.getItem('state'));
  const { assertions, score, gravatarEmail, name } = stateStorage.player;
  return (
    <>
      <h2 data-testid="feedback-text">
        Tela de Feedback
      </h2>
      <img data-testid="header-profile-picture" src={ gravatarEmail } alt="gravatar" />
      <p data-testid="header-player-name">{name}</p>
      <p>{`Voce acertou ${assertions} perguntas `}</p>
      <p data-testid="header-score">{`Sua pontuacao foi ${score}`}</p>
    </>
  );
};

export default Feedback;
