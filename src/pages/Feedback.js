import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import { getLocalStorage } from '../helper';

const header = (user) => (
  <>
    <label htmlFor="feedback-total-score">
      {'Pontos: '}
      <span
        id="feedback-total-score"
        data-testid="feedback-total-score"
      >
        {user.player.score}
      </span>
    </label>
    <label htmlFor="feedback-total-question">
      {'Acertos: '}
      <span
        id="feedback-total-question"
        data-testid="feedback-total-question"
      >
        {user.player.assertions}
      </span>
    </label>
  </>
);

const Feedback = () => {
  const user = getLocalStorage('state');
  console.table(user);
  console.log(md5(user.player.gravatarEmail));
  return (
    <div className="feedback">
      <header>
        <h1 data-testid="feedback-text">
          {user.player.assertions > 2 ? 'Mandou bem!' : 'Podia ser melhor...'}
        </h1>
        {header(user)}
      </header>
      <main>
        <div>
          <img src={ `https://www.gravatar.com/avatar/${md5(user.player.gravatarEmail)}` } alt={ user.name } data-testid="header-profile-picture" />
          <label htmlFor="user-name">
            Jogador:
            <span
              id="user-name"
              data-testid="header-player-name"
            >
              {user.player.name}
            </span>
          </label>
        </div>
        <div>
          <span>
            Pontos:
            <span data-testid="header-score">{user.player.score}</span>
          </span>
          <div>
            <Link to="/ranking" data-testid="btn-ranking">
              Ranking
            </Link>
            <Link to="/" data-testid="btn-play-again">
              Jogar novamente
            </Link>
          </div>
        </div>
      </main>
      <footer>
        <p>Footer</p>
      </footer>
    </div>
  );
};

Feedback.propTypes = {
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
