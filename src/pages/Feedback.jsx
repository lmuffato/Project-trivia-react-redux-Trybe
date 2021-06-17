import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, shape } from 'prop-types';
import { Link } from 'react-router-dom';

import md5 from 'crypto-js/md5';

class Feedback extends Component {
  render() {
    const { user } = this.props;
    const { name, email } = user;
    const hash = md5(email).toString();
    const storage = JSON.parse(localStorage.state);
    return (
      <>
        <header>
          <img src={ `https://www.gravatar.com/avatar/${hash}.png` } alt="Gravatar" data-testid="header-profile-picture" />
          <p data-testid="header-player-name">{`Jogador ${name}`}</p>
          <p data-testid="header-score">{ storage.player.score }</p>
        </header>
        <Link to="/ranking">
          <button data-testid="btn-ranking" type="button">
            Ver Ranking
          </button>
        </Link>
        <p data-testid="feedback-text">
          Mandou bem
        </p>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>
      </>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user,
});

Feedback.propTypes = {
  user: shape({
    name: string,
    email: string,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
